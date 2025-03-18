import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async (req, res) => {
  try {
    const { messages } = req.body;
    console.log(messages);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      temperature: 0.7,
    });

    console.log(completion.choices[0].message.content);

    res.status(200).json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      error: error.message || 'Server Error'
    });
  }
};