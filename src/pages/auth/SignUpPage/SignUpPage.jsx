import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
  return (
    <div className="signup-page" style={{ 
      display: 'flex',
      justifyContent: 'center',
      padding: '2rem',
      minHeight: 'calc(100vh - 64px)' // 留出 Header 高度
    }}>
      <SignUp 
        fallbackRedirectUrl="/dashboard"  // 注册成功后跳转的路径
        signInUrl="/signin"          // 已有账号的登录路径
      />
    </div>
  );
};

export default SignUpPage;