import { useState,useEffect, useRef } from 'react';
import './OpenaiChatBox.css'


export default function OpenaiChatBox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null); 

  // 新增滚动逻辑
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'auto',    // 可以改成 'smooth' 启用平滑滚动
      block: 'nearest'     // 或 'end' 根据需求调整
    });
  }, [messages]); // 当 messages 变化时触发

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      // 添加 Assistant 的空白消息用于逐步更新
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        // 解码并更新最后一条消息
        const chunk = decoder.decode(value);
        setMessages(prev => {
          const lastIndex = prev.length - 1;
          const newMessages = [...prev];
          newMessages[lastIndex].content += chunk;
          return newMessages;
        });
      }

      // const { reply } = await response.json();
      // setMessages(prev => [...prev, reply]);
      
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'system',
        content: '❌ 请求失败，请稍后重试'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, i) => (
        <div key={i} className={`message ${msg.role}`}>
          <div className="content">
            {msg.content.split('```').map((segment, index) => (
              index % 2 === 0 ? (
                <span key={index}>{segment}</span>
              ) : (
                <pre key={index}>
                  <code>{segment}</code>
                </pre>
              )
            ))}
          </div>
        </div>
        ))}
        {/* 添加滚动锚点 */}
        <div ref={messagesEndRef} />
        {/* {loading && <div className="message system">⏳ 思考中...</div>} */}
      </div>
      <div className="form">
        <form onSubmit={handleSubmit} className="input-box">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="messages..."
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'sending...' : 'send'}
          </button>
        </form>
      </div>
    </div>
  );
}
