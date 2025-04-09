import React from 'react';
import { useState,useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css'; // 代码高亮主题
import './OpenaiChatBox.css'


export default function OpenaiChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedVisible, setCopiedVisible] = useState(false);
  const messagesEndRef = useRef(null); 

  // 在代码组件中修改复制逻辑
  const copyCode = (children) => {
    // 递归提取文本内容
    const extractText = (node) => {
      if (typeof node === 'string') return node;
      if (React.isValidElement(node)) {
        return React.Children.map(node.props.children, extractText).join('')
      }
      return '';
    };
  
    const text = React.Children.toArray(children)
      .map(child => extractText(child))
      .join('')
      .replace(/\n$/, ''); // 移除最后一个换行
  
    navigator.clipboard.writeText(text).then(() => {
        setCopiedVisible(true);
        setTimeout(() => setCopiedVisible(false), 1500);
      });
  };

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
        content: '❌ please try again'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
      { messages.map((msg, i) => (
        <div key={i} className={`message ${msg.role}`}>
          <div className="content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <div className="code-block">
                      <div className="code-header">
                        <span>{match[1]}</span>
                        <button 
                          className="copy-button"
                          onClick={() => copyCode(children)}
                        >
                          Copy
                        </button>
                      </div>
                      <pre className={className}>
                        <code {...props}>{children}</code>
                      </pre>
                    </div>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                img({ node, ...props }) {
                  return <img {...props} style={{ maxWidth: '100%', borderRadius: '8px' }}  alt="" />
                },
                a({ node, children, ...props }) { // 确保 <a> 有内容
                    return <a {...props} target="_blank" rel="noopener noreferrer">{children || props.href}</a>
                  }
              }}
            >
              {msg.content}
            </ReactMarkdown>
          </div>
        </div>
      ))}
        {/* 添加滚动锚点 */}
        <div ref={messagesEndRef} />
        {/* {loading && <div className="message system">⏳ 思考中...</div>} */}
        {copiedVisible && <div className="copy-notification">✅ Copied</div>}
      </div>
      <div className="form">
        <form onSubmit={handleSubmit} className="input-box">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ask any questions"
            disabled={loading}
            rows={1} // 初始行数
            onInput={(e) => {
              // 自动调整高度
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'sending' : 'send'}
          </button>
        </form>
      </div>
    </div>
  );
}
