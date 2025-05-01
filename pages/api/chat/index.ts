import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error('[API_CHAT_ERROR] Missing OpenAI API key');
    return res.status(500).json({ error: 'Missing OpenAI API key' });
  }

  try {
    const { model, messages } = req.body;

    if (!model || !messages) {
      console.error('[API_CHAT_ERROR] Missing model or messages in request body');
      return res.status(400).json({ error: 'Missing model or messages' });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ model, messages })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[API_CHAT_ERROR] OpenAI response error:', data);
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);
  } catch (error: any) {
    console.error('[API_CHAT_ERROR] Unexpected server error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}
