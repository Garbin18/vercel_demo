import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com/v1',
  apiKey: process.env.DEEPSEEK_API_KEY
});

export default async (req, res) => {
    try {
      const { messages } = req.body;

      // 设置流式响应头
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Transfer-Encoding', 'chunked');

      const stream = await openai.chat.completions.create({
        model: "deepseek-chat",
        messages,
        temperature: 0.7,
        stream: true // 启用流式
      });

      // 逐块发送数据
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        res.write(content);
      }

      res.end();
        
  
    } catch (error) {
      console.error('API Error:', error);
      // 流式错误需要特殊处理
      res.write(JSON.stringify({ error: error.message || 'Server Error' }));
      res.end();
    }
  };