import React from 'react';
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import ReactECharts from 'echarts-for-react';
import './LangchainAgentBox.css';

export default function LangchainAgentBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedVisible, setCopiedVisible] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesRef = useRef(messages); // 新增 ref 用于追踪最新状态
  const bufferedContentRef = useRef('');

  // 在组件内添加工具响应处理函数
  const processKLineData = (data) => {
    return data.map(item => ({
      // date: new Date(item.datetime).toLocaleDateString(),
      date: item.datetime.split('T')[0],
      open: item.open,
      close: item.close,
      low: item.low,
      high: item.high,
      volume: item.volume
    }));
  };

  // 新增工具函数
  const isCandleData = (content) => {
    try {
      const data = JSON.parse(content);
      return Array.isArray(data) && data.every(item => 
        'open' in item && 'high' in item && 'low' in item && 'close' in item
      );
    } catch {
      return false;
    }
  };

  const getCandleOption = (data) => {
    return {
      backgroundColor: '#1a1a1a',
      title: {
        text: '数字货币K线图',
        left: 'center',
        textStyle: { color: '#fff' }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' }
      },
      legend: {
        data: ['K线', '成交量'],
        top: 30,
        textStyle: { color: '#fff' }
      },
      grid: [
        { left: '8%', 
          right: '2%', 
          height: 300, 
          top: 50},
        { left: '8%', 
          right: '2%', 
          top: 300+50+20,
          bottom: 10}
      ],
      xAxis: [
        {
          type: 'category',
          data: data.map(item => item.date),
          axisLine: { lineStyle: { color: '#8392A5' } },
          axisLabel: {
            interval: 0, 
            rotate: data.length > 10 ? 45 : 0,
            fontSize: data.length > 20 ? 9 : 11
          },
          margin: 15,
          gridIndex: 0
        },
        {
          type: 'category',
          show: false,
          gridIndex: 1,
          data: data.map(item => item.date)
        }
      ],
      yAxis: [
        {
          scale: true,
          splitArea: { show: true },
          axisLine: { lineStyle: { color: '#8392A5' } },
          gridIndex: 0
        },
        {
          scale: true,
          show: true,
          gridIndex: 1
        }
      ],
      series: [
        {
          type: 'candlestick',
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: data.map(item => [item.open, item.close, item.low, item.high]),
          itemStyle: {
            color: '#00da3c',
            color0: '#ec0000',
            borderColor: '#00da3c',
            borderColor0: '#ec0000',
            borderRadius: 4, // 控制柱子的圆角大小
            borderWidth: 1   // 确保边框可见
          }
        },
        {
          type: 'bar',
          name: '成交量',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data.map(item => item.volume),
          itemStyle: { color: '#565959' }
        }
      ],
      dataZoom: [  // 添加缩放控件
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          yAxisIndex: [0, 1], 
          zoomLock: false,
          // start: 0,
          // end: Math.min(100, 10000 / data.length)
        }
      ]
    };
  };

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
      setMessages(prev => [...prev, { role: 'assistant', content: '' ,steps: []}]);
      bufferedContentRef.current = ''; // 重置缓存

      // const response = await fetch('http://localhost:8000/api/langchain', {
        const response = await fetch('https://render-python-api.onrender.com/api/langchain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input })
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8', { stream: true });
      let buffer = '';

      // let bufferedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        // 优化解码处理
        buffer += decoder.decode(value, { stream: true  });
        
        // 分割完整数据块
        const chunks = buffer.split('\n\n');
        buffer = chunks.pop() || ''; // 保留未完成部分

        for (const chunk of chunks) {
          if (!chunk.startsWith('data: ')) continue;
          
          const content = chunk.slice(6).trim();
          if (content === '[DONE]') break;

          try {
            const data = JSON.parse(content);
          
            // 处理不同类型的数据
            switch(data.type) {
              case 'tool_call':
                setMessages(prev => {
                  const newMessages = prev.map(msg => ({
                    ...msg,
                    steps: [...(msg.steps || [])]
                  }));
                  
                  const lastMsg = newMessages[newMessages.length - 1];
                   // 复合去重检查
                  const isDuplicate = lastMsg.steps.some(step => 
                    step.type === 'tool_call' &&
                    step.input_tokens === data.input_tokens && // Token数相同
                    step.output_tokens === data.output_tokens
                  );
                  if (!isDuplicate) {
                    newMessages[newMessages.length - 1] = {
                      ...lastMsg,
                      steps: [
                        ...lastMsg.steps,
                        {
                          ...data,
                          _ts: performance.now() // 高精度时间戳
                        }
                      ]
                    };
                  }
                  return newMessages;
                });
                break;

              case 'tool_response':
                setMessages(prev => {
                  const newMessages = prev.map(msg => ({
                    ...msg,
                    steps: [...(msg.steps || [])]
                  }));
                  
                  const lastMsg = newMessages[newMessages.length - 1];
                   // 复合去重检查
                  const isDuplicate = lastMsg.steps.some(step => 
                    step.type === 'tool_response' &&
                    step.input_tokens === data.input_tokens && // Token数相同
                    step.output_tokens === data.output_tokens
                  );
                  if (!isDuplicate) {
                    newMessages[newMessages.length - 1] = {
                      ...lastMsg,
                      steps: [
                        ...lastMsg.steps,
                        {
                          ...data,
                          _ts: performance.now() // 高精度时间戳
                        }
                      ]
                    };
                  }
                  return newMessages;
                });
                break;

                case 'final_answer':
                  // 逐字追加到缓冲区
                  bufferedContentRef.current += data.content;
                  
                  // 使用函数式更新确保获取最新状态
                  setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMsgIndex = newMessages.length - 1;
                    
                    // 创建新数组避免直接修改原数组
                    const updatedMessages = newMessages.map((msg, index) => {
                      if (index === lastMsgIndex) {
                        return {
                          ...msg,
                          content: bufferedContentRef.current
                        };
                      }
                      return msg;
                    });
                    
                    return updatedMessages;
                  });
                  
                  // 添加微延迟让浏览器渲染
                  await new Promise(resolve => setTimeout(resolve, 20));
                  break;

              // case 'final_answer':
              //   bufferedContentRef.current += data.content;
              //   setMessages(prev => {
              //     const newMessages = [...prev];
              //     const lastMsg = newMessages[newMessages.length - 1];
              //     return [
              //       ...newMessages.slice(0, -1),
              //       {
              //         ...lastMsg,
              //         content: bufferedContentRef.current,
              //         pendingAnswer: false
              //       }
              //     ];
              //   });
              //   break;

              // 新增default分支
              default:
                if (process.env.NODE_ENV === 'development') {
                  console.warn('[Dev Warn] 收到未知的流数据类型:', {
                    type: data.type,
                    fullData: data
                  });
                }
                break;
            }
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
            {/* 显示中间步骤 */}
            {msg.steps?.map((step, stepIndex) => (
              <div key={stepIndex} className="process-step">
                {step.type === 'tool_call' && (
                  <div className="tool-call">
                    <span>🔧 调用工具: {step.tool_name}</span>
                    <span className="token-info">
                      (Token: {step.input_tokens} in / {step.output_tokens} out)
                    </span>
                  </div>
                )}
                {step.type === 'tool_response' && (
                  <div className="tool-response" style={{overflow: 'auto',}}>
                    {isCandleData(step.content) ? (
                      <ReactECharts
                        option={getCandleOption(processKLineData(JSON.parse(step.content)))}
                        style={{ 
                            height:'500px',
                            width: '780px',
                            minWidth: '780px',
                            borderRadius: '8px',
                            overflow: 'hidden'  
                          }}
                        theme="dark"
                      />
                    ) : (
                      <ReactMarkdown>
                        {`\`\`\`json\n${JSON.stringify(JSON.parse(step.content), null, 2)}\n\`\`\``}
                      </ReactMarkdown>
                    )}
                  </div>
                )}
              </div>
            ))}
            {/* 显示最终回答 */}
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