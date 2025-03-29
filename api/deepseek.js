import OpenAI from "openai";

const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com/v1',
        apiKey: process.env.DEEPSEEK_API_KEY
});

export default async (req, res) => {
    try {
      const { messages } = req.body;
      console.log(messages);
      
      const completion = await openai.chat.completions.create({
        model: "deepseek-chat",
        messages,
        temperature: 0.7,
      });
  
      console.log(completion.choices[0].message);
  
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