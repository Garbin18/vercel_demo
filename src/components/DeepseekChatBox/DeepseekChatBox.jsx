import './DeepseekChatBox.css'
import { useState } from 'react';

export default function DeepseekChatBox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/deepseek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      const { reply } = await response.json();
      setMessages(prev => [...prev, reply]);
      
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
            <div className="content">{msg.content}</div>
          </div>
        ))}
        {loading && <div className="message system">⏳ 思考中...</div>}
      </div>
      <div className="form">
        <form onSubmit={handleSubmit} className="input-box">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入消息..."
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? '发送中...' : '发送'}
          </button>
        </form>
      </div>
    </div>
  );
}
