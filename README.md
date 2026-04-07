# System Query Demo

A demo application that showcases how to make API calls to the Claude LLM using the Anthropic SDK. The app simulates a tech guru advisor board that answers technology questions, with support for custom system prompts to control the advisor's behavior and scope.

## What It Showcases

- Making API calls to the Claude Haiku model via the Anthropic SDK
- Using system prompts to set guardrails and persona for the LLM
- Inspecting the request payload sent to the API
- Displaying both the parsed answer and the full raw API response
- A simple Node.js + Express backend proxying requests to the Anthropic API

## How It Works

The frontend collects an optional system prompt and a user question, sends them to a lightweight Express server, which forwards the request to the Anthropic Messages API. The response flows back and is displayed in three views: the outgoing request payload, the parsed answer text, and the full raw JSON.

## Architecture

```
Browser (index.html)
  ├── System Prompt textarea
  ├── Question input + Submit button
  ├── Request Sent to API panel (displays outgoing payload)
  ├── Answer panel (displays parsed response + copy button)
  └── Raw API Response panel (displays full JSON response)
        │
        ▼  POST /ask { question, system }
Express Server (server.js)
        │
        ▼  client.messages.create()
Anthropic API (claude-haiku-4-5-20251001)
```

- **Frontend** — Single-page `index.html` with inline CSS/JS. No build step or framework.
- **Backend** — `server.js` using Express to serve the static frontend and proxy API requests. Loads the API key from `.env` via dotenv.
- **API** — Anthropic SDK (`@anthropic-ai/sdk`) sends messages to Claude Haiku with an optional system prompt.

## Workflow

1. User optionally enters a system prompt to guide the advisor's behavior
2. User types a question and presses Enter or clicks Ask
3. The frontend displays the request payload in the "Request Sent to API" panel
4. The backend forwards the question (and system prompt if provided) to the Claude API
5. The parsed answer appears in the Answer panel; the full JSON response appears in the Raw API Response panel

## How to Run

### Prerequisites

- Node.js (v18+)
- An Anthropic API key

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/AndrewNelson951/system-query-demo.git
   cd system-query-demo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with your API key:

   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

4. Start the server (from WSL):

   ```bash
   npm start
   ```

5. Open http://localhost:3000 in your browser

## AI Transparency Statement

"In creating this project, I collaborated with Claude Sonnet and Opus 4.6 to assist with research and coding. The final output accurately reflects my understanding, expertise, and intended meaning. While AI assistance was instrumental in the process, I maintain full responsibility for the content, its accuracy, and its presentation. This disclosure is made in the spirit of transparency and to acknowledge the role of AI in the creation process."
