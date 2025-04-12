import React from 'react';
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import './OpenaiChatBox.css';

export default function OpenaiChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedVisible, setCopiedVisible] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesRef = useRef(messages); // 新增 ref 用于追踪最新状态
  const bufferedContentRef = useRef('');

  // 同步 ref 与 state
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const copyCode = (children) => {
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
      .replace(/\n$/, '');
  
    navigator.clipboard.writeText(text).then(() => {
      setCopiedVisible(true);
      setTimeout(() => setCopiedVisible(false), 1500);
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'auto',
      block: 'nearest'
    });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // 先添加空白 assistant 消息
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      bufferedContentRef.current = ''; // 重置缓存

      // const response = await fetch('http://localhost:8000/api/openai', {
        const response = await fetch('https://my-python-api-yrmx.onrender.com/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messagesRef.current, userMessage] })
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      // let bufferedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        // 优化解码处理
        buffer += decoder.decode(value, { stream: false });
        
        // 分割完整数据块
        const chunks = buffer.split('\n\n');
        buffer = chunks.pop() || ''; // 保留未完成部分

        for (const chunk of chunks) {
          if (!chunk.startsWith('data: ')) continue;
          
          const content = chunk.slice(6).trim();
          if (content === '[DONE]') break;

          try {
            const data = JSON.parse(content);
            if (!data.content) continue;

            // 更新 ref 的当前值
            bufferedContentRef.current += data.content;

            // 用最新内容替换 assistant 的最后一条消息
            setMessages(prev => {
              const newMessages = [...prev];
              const lastIndex = newMessages.length - 1;
              if (lastIndex >= 0) {
                newMessages[lastIndex] = {
                  ...newMessages[lastIndex],
                  content: bufferedContentRef.current // 直接覆盖而不是 +=
                };
              }
              return newMessages;
            });
          } catch (e) {
            console.error('解析错误:', chunk);
          }
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'system',
        content: '❌ try again later'
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
                            copy
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
                    return <img {...props} style={{ maxWidth: '100%', borderRadius: '8px' }} alt="" />
                  },
                  a({ node, children, ...props }) {
                    return <a {...props} target="_blank" rel="noopener noreferrer">{children || props.href}</a>
                  }
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        {copiedVisible && <div className="copy-notification">✅ copied</div>}
      </div>
      
      <div className="form">
        <form onSubmit={handleSubmit} className="input-box">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ask me everything..."
            disabled={loading}
            rows={1}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'sending...' : 'send'}
          </button>
        </form>
      </div>
    </div>
  );
}