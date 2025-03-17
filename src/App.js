import React, { useState } from 'react';
import ChatDialog from './ChatDialog';

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="App">
      <h1>AI 对话助手</h1>
      <button 
        onClick={() => setDialogOpen(true)}
        style={{ padding: '10px 20px', fontSize: '1.2rem' }}
      >
        打开对话
      </button>
      
      <ChatDialog 
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     // <div className="App">
//     //   <header className="App-header">
//     //     <img src={logo} className="App-logo" alt="logo" />
//     //     <p>
//     //       Edit <code>src/App.js</code> and save to reload.
//     //     </p>
//     //     <a
//     //       className="App-link"
//     //       href="https://reactjs.org"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       Learn React
//     //     </a>
//     //   </header>
//     // </div>
    
//     <div style={{ padding: 20 }}>
//       <h1>欢迎来到我的Vercel页面！</h1>
//       <p>已成功部署 🎉</p>
//       <p>当前时间：{new Date().toLocaleString()}</p>
//     </div>
//   );
// }

// export default App;
