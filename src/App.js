import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import SignUpPage from './pages/auth/SignUpPage/SignUpPage';
import SignInPage from './pages/auth/SignInPage/SignInPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import OpenAiChatBoxPage from './pages/chatbox/OpenAiChatBoxPage/OpenAiChatBoxPage';
import './App.css';

const App = () => {
    
  // const clerk_publishable_key = '...'; 
  const clerk_publishable_key = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY

  return (
    <ClerkProvider 
      publishableKey={clerk_publishable_key}
      afterSignOutUrl="/"
    >
      <Router>
        <Routes>
          {/* 主布局包裹所有需要导航栏的页面 */}
          <Route path="/" element={<MainLayout />}>
            <Route index  element={<HomePage />} />
          </Route>
          <Route path="signup" element={<SignUpPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/openai" element={<OpenAiChatBoxPage />} />
        </Routes>
      </Router>
    </ClerkProvider>
  );
};

export default App;