import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import SignUpPage from './pages/auth/SignUpPage/SignUpPage';
import './App.css';

const App = () => {
    
  // const clerk_publishable_key = '...'; // 建议改用环境变量

  return (
    <ClerkProvider 
    // publishableKey={clerk_publishable_key}
      publishableKey={process.env.CLERK_PUBLISHABLE_KEY} 
      afterSignOutUrl="/"
    >
      <Router>
        <Routes>
          {/* 主布局包裹所有需要导航栏的页面 */}
          <Route path="/" element={<MainLayout />}>
            <Route index  element={<HomePage />} />
            <Route path="signup" element={<SignUpPage />} />
          </Route>
        </Routes>
      </Router>
    </ClerkProvider>
  );
};

export default App;