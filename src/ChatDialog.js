import React, { useState } from 'react';
import './ChatDialog.css'; // 新建样式文件

export default function ChatDialog({ open, onClose }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      // 添加用户消息
      setMessages(prev => [...prev, { role: 'user', content: input }]);
      
      // 调用后端接口
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();
      // 添加AI回复
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('API Error:', error);
      setMessages(prev => [...prev, { role: 'error', content: '服务暂时不可用' }]);
    }
    setInput('');
    setLoading(false);
  };

  return (
    <div className={`dialog ${open ? 'show' : ''}`}>
      <div className="dialog-content">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              {msg.content}
            </div>
          ))}
          {loading && <div className="message loading">AI正在思考...</div>}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入你的问题..."
            disabled={loading}
          />
          <button type="submit" disabled={loading}>发送</button>
        </form>
      </div>
    </div>
  );
}
