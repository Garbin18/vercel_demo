import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div className="signin-page" style={{ 
      display: 'flex',
      justifyContent: 'center',
      padding: '2rem',
      minHeight: 'calc(100vh - 64px)' // 与注册页面保持一致的布局
    }}>
      <SignIn 
        fallbackRedirectUrl="/dashboard"      // 登录成功后跳转路径
        signUpUrl="/signup"           // 注册页面路径
      />
    </div>
  );
};

export default SignInPage;