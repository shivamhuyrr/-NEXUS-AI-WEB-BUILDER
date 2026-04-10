# NEXUS AI WEBSITE BUILDER

<div align="center">
  <img src="https://raw.githubusercontent.com/shivamhuyrr/NEXUS-AI-Web-Builder/main/public/nexus-favicon.svg" width="100" height="100" alt="NEXUS AI Logo">
  
  <h3>🚀 Premium AI-Powered Real-Time Website Builder</h3>

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)
  [![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
  [![Gemini AI](https://img.shields.io/badge/AI-Google_Gemini-4285F4?logo=google)](https://deepmind.google/technologies/gemini/)

  **Build stunning, fully functional websites in seconds using the power of generative AI.**
</div>

---

## ✨ Overview

**NEXUS AI WEBSITE BUILDER** is a state-of-the-art platform that transforms natural language descriptions into premium, production-ready websites. Leveraging advanced models like **Google Gemini 1.5 Pro**, it provides a seamless, iterative building experience with live previews and instant code modifications.

## 🚀 How It Works (The Workflow)

The core engine utilizes an iterative, conversational approach to website building:

1. **Natural Language Input**: Describe your vision (e.g., "A dark-themed fitness landing page").
2. **AI Engine Processing**: The backend routes your request to **Google Gemini**, which architecturally splits the task into HTML structure, CSS styling, and logic.
3. **Real-Time Code Streaming**: Code is streamed to the UI chunk-by-chunk using **Server-Sent Events (SSE)**, providing immediate feedback.
4. **Instant Sandboxed Rendering**: The generated code is safely executed inside an isolated **iframe environment**, ensuring security and real-time visual updates.
5. **Conversational Refinement**: Simply ask the AI to "make the buttons larger" or "change the primary color to gold" to iteratively polish the site.

## 🏗️ Architecture Detail

- **Frontend**: React-based SPA with a focus on real-time stream parsing and iframe injection.
- **Backend**: Node.js/Express serverless functions designed for streaming AI responses.
- **Security**: Sandbox execution of generated scripts and automatic `.env` protection.

## 📁 Project Structure

```text
NEXUS-AI-Web-Builder/
├── api/                # Vercel serverless entry points
├── public/             # Static assets (favicons, logos)
├── server/             # Express backend logic & AI service integrations
├── src/                # React components & UI logic
│   ├── components/     # Reusable UI parts (Renderer, Terminal, etc.)
│   ├── services/       # AI communication layer
│   └── styles/         # Tailwind CSS & Global styles
├── docs/               # Advanced technical documentation
├── vercel.json         # Deployment & Routing configuration
└── package.json        # Project dependencies & scripts
```

## 🌟 Key Features

- 🛠️ **Instant AI Generation**: Create full-page layouts from a single prompt.
- 🎨 **Glassmorphism UI**: A sleek, modern aesthetic designed for a premium user experience.
- ⚡ **Real-Time Synchronization**: Watch your changes render live as the AI streams code.
- 📱 **Mobile-Optimized**: Every generated site is fully responsive by default.
- 🔒 **Safe Sandboxing**: Test and refine code in an isolated, secure iframe environment.
- 🌍 **Multi-Model Support**: Integrated with Google Gemini, OpenAI, and Anthropic Claude.

- **Frontend**: [React.js](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **AI Engine**: [Google Gemini API](https://ai.google.dev/), [Anthropic SDK](https://www.anthropic.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **I18n**: [i18next](https://www.i18next.com/)

## 🛠️ Feature Matrix & AI Skills

NEXUS AI utilizes a specialized suite of over 15+ deterministic and probabilistic skills to ensure high-quality site generation:

| Category | Skill | Description | Logic Path |
| :--- | :--- | :--- | :--- |
| **Parsing** | `reg-extract-3.0` | Real-time HTML/CSS extraction from AI streams. | `server/geminiService.js` |
| **Rendering** | `iframe-iso-std` | Safe sandbox execution via isolated iframes. | `src/components/LiveRenderer.js` |
| **Logic** | `delta-mod-diff` | Fragment-based updates for sectional modifications. | `api/modify-website` |
| **Vision** | `arch-layout-v1` | Semantic layout planning based on prompt intent. | `AIStepVisualizer.js` |
| **Style** | `tailwind-opt-4` | Optimized utility class generation for responsiveness. | `tailwind.config.js` |
| **Export** | `csb-bridge-x` | Remote project instantiation in CodeSandbox. | `src/components/LiveRenderer.js` |

---

## ⚙️ Quick Start

### 1. Prerequisites

- Node.js (v18+)
- Local environment setup (details in [SETUP_GUIDE.md](SETUP_GUIDE.md))

### 2. Installation

```bash
git clone https://github.com/shivamhuyrr/NEXUS-AI-Web-Builder.git
cd NEXUS-AI-Web-Builder
npm install
```

### 3. Environment Setup

Create a `.env` in the `server` directory and add your keys:

```env
GEMINI_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
```

### 4. Run Locally

```bash
# Start Backend
node server/server.js

# Start Frontend (Project Root)
npm start
```

---

## 🗺️ Roadmap

- [ ] **Custom Templates**: Pre-defined starting points for various industries.
- [ ] **Export to ZIP**: One-click download of the generated source code.
- [ ] **Database Integration**: Built-in support for Postgres/Supabase.
- [ ] **Voice Commands**: Build your website using just your voice.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Please see [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  Built with ❤️ by <b>Shivam Chauhan</b>
</div>
