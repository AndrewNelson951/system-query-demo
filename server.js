import Anthropic from '@anthropic-ai/sdk';
import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.post('/ask', async (req, res) => {
  const { question, system } = req.body;
  if (!question) return res.status(400).json({ error: 'question is required' });

  const params = {
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    messages: [{ role: 'user', content: question }],
  };
  if (system) params.system = system;

  const response = await client.messages.create(params);

  res.json(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Advisor Board running at http://localhost:${PORT}`));
