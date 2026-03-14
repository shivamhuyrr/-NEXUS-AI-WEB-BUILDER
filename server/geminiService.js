const { GoogleGenAI } = require('@google/genai');

// Initialize the modern Gemini SDK Client instead of the deprecated one
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function extractPartialCode(content, language) {
    // Looks for language block or gracefully fallback to anything that resembles html/css
    const regex = new RegExp(`(?:\`\`\`${language}\\s*|^\\s*<(!|html|style)|[^{}]*body\\s*\\{)([\\s\\S]*?)(?:\`\`\`|$)`, 'i');
    
    // Original simpler regex for strict markdown blocks
    const strictRegex = new RegExp(`\`\`\`${language}\\s*([\\s\\S]*?)(\`\`\`|$)`, 'i');
    
    let match = content.match(strictRegex);
    if (match) return match[1];
    
    // If strict regex fails but we are looking for html/css, do a naive extraction
    if (language === 'html') {
        const htmlMatch = content.match(/<html[\s\S]*<\/html>/i) || content.match(/<body[\s\S]*<\/body>/i);
        if (htmlMatch) return htmlMatch[0];
    } else if (language === 'css') {
        const cssMatch = content.match(/body\s*\{[\s\S]*\}/i);
        if (cssMatch) return cssMatch[0];
    }
    
    return '';
}

async function generateWebsite(description) {
    try {
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

        // Under the new GenAI SDK, systemInstructions go in the config object
        const responseStream = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: "You are an expert web developer specializing in creating modern, responsive websites. Always generate complete, functional HTML and CSS code blocks based on the given description. Respond with HTML code first, followed by CSS code. Use ```html and ```css code blocks to enclose the respective code."
            }
        });

        return responseStream;

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        throw new Error('Failed to generate website: ' + error.message);
    }
}

async function modifyWebsite(modificationDescription, currentHtml, currentCss) {
    try {
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

        // Stream the modifications
        const responseStream = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: "You are an expert web developer making modifications to existing websites. Maintain the overall design consistency while implementing the requested changes. Modify the given HTML and CSS code based on the provided modification description. Respond with the updated HTML code first, followed by the updated CSS code. Use ```html and ```css code blocks to enclose the respective code."
            }
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
