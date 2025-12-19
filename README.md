# NCD Health Assistant - Frontend

This is the user interface for the NCD Health Assistant chatbot. It's a web application where users can ask questions about non-communicable diseases and get AI-powered answers.

## What Does It Do

The frontend provides a clean and easy-to-use chat interface. Users can type their questions, see the conversation history, and view helpful reference links to health organizations. All chat conversations are saved in your browser so you don't lose them when you refresh the page.

## Features

- Chat with the AI assistant about health topics
- See your previous conversations in the sidebar
- Delete old conversations you don't need anymore
- View helpful health organization links
- All your chat history is saved automatically in your browser

## What You Need

- Node.js version 16 or higher installed on your computer
- The backend server running (see the backend README for setup)

## Getting Started

1. Open Terminal or Command Prompt in this folder

2. Install the required packages:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and go to http://localhost:5173

Make sure the backend server is running at http://localhost:8000 before you start chatting.

## How to Use

1. Type your question in the text box at the bottom
2. Press Enter or click the send button
3. Wait for the AI to respond
4. Your conversation is automatically saved
5. Click "New Chat" to start a fresh conversation
6. Hover over any chat in the history sidebar and click the trash icon to delete it

## Project Structure

- src/App.tsx - Main application logic
- src/components - All the UI components (chat input, messages, history, references)
- src/services/api.ts - Code that talks to the backend server
- src/utils/storage.ts - Code that saves chats to your browser
- src/types - Data structure definitions

## Common Issues

**Problem: Can't connect to backend**
Make sure the backend server is running at http://localhost:8000

**Problem: Chat history disappeared**
Check if you cleared your browser data or used private/incognito mode

**Problem: Page won't load**
Make sure you ran npm install and the development server is running

## Building for Production

When you're ready to deploy the app:

```
npm run build
```

This creates an optimized version in the dist folder that you can upload to any web hosting service.

## Technology Used

Built with React, TypeScript, Tailwind CSS, and Vite for a fast and modern user experience.
