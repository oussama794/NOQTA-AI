import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, text } = req.body;

  // Validate input
  if (!text || typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    // Build prompt based on action
    let prompt;
    switch (action) {
      case 'summarize':
        prompt = `Summarize this:\n\n${text}`;
        break;
      case 'rephrase':
        prompt = `Rephrase this:\n\n${text}`;
        break;
      case 'complete':
        prompt = `Complete this text naturally:\n\n${text}`;
        break;
      default:
        prompt = text;
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const result = completion.choices[0].message.content;

    return res.status(200).json({ result });
  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Handle specific OpenAI errors
    if (error.status === 401) {
      return res.status(500).json({ error: 'Invalid API key' });
    }
    
    return res.status(500).json({ 
      error: 'Failed to process request',
      details: error.message 
    });
  }
}