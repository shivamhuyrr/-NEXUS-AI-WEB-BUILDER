const Anthropic = require('@anthropic-ai/sdk');



const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

function extractPartialCode(content, language) {
  const regex = new RegExp(`\`\`\`${language}\\s*([\\s\\S]*?)(\`\`\`|$)`, 'i');
  const match = content.match(regex);
  return match ? match[1] : '';
}

async function generateWebsite(description) {
  try {
    const stream = await anthropic.messages.create({
      model: "claude-3-5-sonnet-latest", // Updated to a valid Claude 3.5 Sonnet model
      max_tokens: 8000, // Increased for more complete websites
      stream: true,
      system: `You are an expert web developer specializing in creating modern, responsive websites. Always generate complete, functional code that works immediately when saved as files.

IMPORTANT REQUIREMENTS:
- Generate complete, production-ready HTML and CSS
- Use modern web standards and best practices
- Make designs responsive and mobile-friendly
- Include semantic HTML structure
- Use CSS Grid/Flexbox for layouts
- Add hover effects and smooth transitions
- Ensure good contrast and accessibility
- Include meta tags for viewport and SEO
- Use modern color schemes and typography
- Make interactive elements functional with CSS only when possible

FORMAT: Always return exactly two code blocks:
1. Complete HTML (including DOCTYPE, head, meta tags, etc.)
2. Complete CSS (all styles needed)`,
      messages: [
        {
          role: "user",
          content: `Create a complete, modern website with the following description: "${description}"

Requirements:
- Fully responsive design that works on desktop, tablet, and mobile
- Modern, professional appearance with good visual hierarchy
- Include proper navigation if multiple sections are needed
- Use contemporary design trends (subtle shadows, rounded corners, good spacing)
- Ensure all interactive elements have hover states
- Include placeholder content that makes sense for the concept
- Use a cohesive color scheme throughout
- Make it visually engaging and user-friendly

Return the HTML and CSS separately, enclosed in code blocks (\`\`\`html ... \`\`\` and \`\`\`css ... \`\`\`).`
        }
      ],
    });
    return stream;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw new Error('Failed to generate website: ' + error.message);
  }
}

async function modifyWebsite(modificationDescription, currentHtml, currentCss) {
  try {
    const stream = await anthropic.messages.create({
      model: "claude-3-5-sonnet-latest", // Consistent valid model usage
      max_tokens: 8000,
      stream: true,
      system: `You are an expert web developer making modifications to existing websites. Maintain the overall design consistency while implementing the requested changes.

MODIFICATION GUIDELINES:
- Preserve existing functionality unless specifically asked to change it
- Maintain responsive design principles
- Keep the visual style consistent with existing design
- Only modify what's specifically requested
- Ensure all changes work properly across devices
- Maintain accessibility standards
- Update related styles if needed for consistency

FORMAT: Always return exactly two complete code blocks with the fully updated code.`,
      messages: [
        {
          role: "user",
          content: `Current HTML:
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

Return the complete updated HTML and CSS separately, enclosed in code blocks (\`\`\`html ... \`\`\` and \`\`\`css ... \`\`\`).`
        }
      ],
    });
    return stream;
  } catch (error) {
    console.error('Error calling Claude API for modification:', error);
    throw new Error('Failed to modify website: ' + error.message);
  }
}

// Enhanced function to generate specific types of websites
async function generateSpecializedWebsite(type, description, additionalRequirements = '') {
  const typePrompts = {
    landing: `Create a high-converting landing page with hero section, features, testimonials, and CTA buttons. Focus on conversion optimization and visual appeal.`,
    portfolio: `Create a professional portfolio website with project showcases, about section, and contact information. Emphasize visual presentation and user experience.`,
    business: `Create a professional business website with services, about, and contact sections. Focus on credibility and clear value proposition.`,
    blog: `Create a modern blog layout with article listings, sidebar, and clean reading experience. Prioritize typography and readability.`,
    ecommerce: `Create an e-commerce product page or catalog with product grids, filters, and shopping cart elements. Focus on product presentation.`,
    dashboard: `Create a clean dashboard interface with data visualization placeholders, navigation, and modern UI components.`
  };

  const specializedPrompt = typePrompts[type] || '';

  try {
    const stream = await anthropic.messages.create({
      model: "claude-3-5-sonnet-latest",
      max_tokens: 8000,
      stream: true,
      system: `You are an expert web developer specializing in ${type} websites. Create modern, conversion-focused designs that follow industry best practices.

${specializedPrompt}

TECHNICAL REQUIREMENTS:
- Mobile-first responsive design
- Fast loading and optimized code
- SEO-friendly structure
- Accessibility compliance (WCAG guidelines)
- Modern CSS features (Grid, Flexbox, custom properties)
- Smooth animations and micro-interactions
- Cross-browser compatibility

DESIGN REQUIREMENTS:
- Contemporary, professional appearance
- Clear visual hierarchy and information architecture
- Consistent branding and color scheme
- Effective use of whitespace
- Engaging but not overwhelming visuals`,
      messages: [
        {
          role: "user",
          content: `Create a ${type} website: "${description}"

${additionalRequirements ? `Additional Requirements: ${additionalRequirements}` : ''}

Make it modern, professional, and fully functional. Include realistic placeholder content and ensure excellent user experience across all devices.

Return the HTML and CSS separately, enclosed in code blocks (\`\`\`html ... \`\`\` and \`\`\`css ... \`\`\`).`
        }
      ],
    });
    return stream;
  } catch (error) {
    console.error('Error generating specialized website:', error);
    throw new Error('Failed to generate specialized website: ' + error.message);
  }
}

module.exports = {
  generateWebsite,
  modifyWebsite,
  extractPartialCode,
  generateSpecializedWebsite
};