const { GoogleGenAI } = require('@google/genai');

function getAI() {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not set. Add it to your .env or Vercel dashboard.');
    }
    return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

// Models to try in order of preference
const MODELS = ['gemini-flash-latest', 'gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite'];

function extractPartialCode(content, language) {
    const strictRegex = new RegExp(`\`\`\`${language}\\s*([\\s\\S]*?)(\`\`\`|$)`, 'i');
    let match = content.match(strictRegex);
    if (match) return match[1];

    if (language === 'html') {
        const htmlMatch = content.match(/<html[\s\S]*<\/html>/i) || content.match(/<body[\s\S]*<\/body>/i);
        if (htmlMatch) return htmlMatch[0];
    } else if (language === 'css') {
        const cssMatch = content.match(/body\s*\{[\s\S]*\}/i);
        if (cssMatch) return cssMatch[0];
    }

    return '';
}

async function tryWithRetryAndFallback(requestFn, maxRetries = 3) {
    for (const model of MODELS) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                console.log(`Trying model: ${model} (attempt ${attempt}/${maxRetries})`);
                return await requestFn(model);
            } catch (error) {
                const status = error.status || error.statusCode || 0;
                console.error(`Model ${model} attempt ${attempt} failed (status ${status}): ${error.message?.substring(0, 100)}`);
                
                if (status === 503 || status === 429) {
                    // Overloaded or rate limited — wait then retry or try next model
                    if (attempt < maxRetries) {
                        const delay = 3000 * attempt;
                        console.log(`Waiting ${delay}ms before retry...`);
                        await new Promise(r => setTimeout(r, delay));
                    }
                    continue;
                }
                // For other errors, throw immediately
                throw error;
            }
        }
        console.log(`All retries exhausted for ${model}, trying next model...`);
    }
    throw new Error('All models are currently unavailable. Please try again in a few moments.');
}

async function generateWebsite(description) {
    const ai = getAI();
    
    const prompt = `Create a complete, modern website with the following description: "${description}"

Requirements:
- Fully responsive design that works on desktop, tablet, and mobile
- Modern, professional appearance with good visual hierarchy
- Include proper navigation if multiple sections are needed
- Use contemporary design trends (subtle shadows, rounded corners, good spacing)
- Ensure all interactive elements have hover states
- Include placeholder content that makes sense for the concept
- Use a cohesive color scheme throughout
- Make it visually engaging and user-friendly

Return the HTML and CSS separately, enclosed in code blocks (\`\`\`html ... \`\`\` and \`\`\`css ... \`\`\`).`;

    try {
        const responseStream = await tryWithRetryAndFallback(async (model) => {
            return await ai.models.generateContentStream({
                model: model,
                contents: prompt,
                config: {
                    systemInstruction: "You are an expert web developer specializing in creating modern, responsive websites. Always generate complete, functional HTML and CSS code blocks based on the given description. Respond with HTML code first, followed by CSS code. Use ```html and ```css code blocks to enclose the respective code."
                }
            });
        });

        return responseStream;

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        throw new Error('Failed to generate website: ' + error.message);
    }
}

async function modifyWebsite(modificationDescription, currentHtml, currentCss) {
    const ai = getAI();

    const prompt = `
Current HTML:
\`\`\`html
${currentHtml}
\`\`\`

Current CSS:
\`\`\`css
${currentCss}
\`\`\`

Modification Request: "${modificationDescription}"

Please implement the requested modification while:
- Maintaining the existing design aesthetic and functionality
- Ensuring the changes work responsively across all devices
- Keeping the code clean and well-organized
- Preserving any existing interactive elements
- Making sure all related styles are updated for consistency

Return the complete updated HTML and CSS separately, enclosed in code blocks (\`\`\`html ... \`\`\` and \`\`\`css ... \`\`\`).`;

    try {
        const responseStream = await tryWithRetryAndFallback(async (model) => {
            return await ai.models.generateContentStream({
                model: model,
                contents: prompt,
                config: {
                    systemInstruction: "You are an expert web developer making modifications to existing websites. Maintain the overall design consistency while implementing the requested changes. Modify the given HTML and CSS code based on the provided modification description. Respond with the updated HTML code first, followed by the updated CSS code. Use ```html and ```css code blocks to enclose the respective code."
                }
            });
        });

        return responseStream;

    } catch (error) {
        console.error('Error calling Gemini API for modification:', error);
        throw new Error('Failed to modify website: ' + error.message);
    }
}

module.exports = {
    generateWebsite,
    modifyWebsite,
    extractPartialCode
};
