import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async (req, res) => {
  try {
    const { messages } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      role: "user",
      messages,
      temperature: 0.7,
    });

    res.status(200).json({
      reply: completion.choices[0].message
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      error: error.message || 'Server Error'
    });
  }
};