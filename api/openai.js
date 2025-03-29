import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async (req, res) => {
  try {
    const { messages } = req.body;

    // 设置流式响应头
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
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

    // console.log(completion.choices[0].message);

    // res.status(200).json({
    //   reply: completion.choices[0].message
    // });

  } catch (error) {
    console.error('API Error:', error);
    // 流式错误需要特殊处理
    res.write(JSON.stringify({ error: error.message || 'Server Error' }));
    res.end();
    // res.status(500).json({
    //   error: error.message || 'Server Error'
    // });
  }
};