# Setup Guide

Follow these steps to set up NEXUS AI WEBSITE BUILDER for local development.

## 1. Prerequisites

- **Node.js**: v18.0.0 or higher.
- **npm**: v9.0.0 or higher.
- **Git**: Installed on your system.

## 2. Installation

### Clone the Repository

```bash
git clone https://github.com/shivamhuyrr/NEXUS-AI-Web-Builder.git
cd NEXUS-AI-Web-Builder
```

### Install Dependencies

```bash
# Install frontend and shared dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

## 3. Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_claude_api_key
```

## 4. Running the Application

### Start the Backend

```bash
node server/server.js
```

### Start the Frontend

In a new terminal:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## 5. Deployment

This project is configured for Vercel. Simply push to your branch or run `vercel` to deploy.
