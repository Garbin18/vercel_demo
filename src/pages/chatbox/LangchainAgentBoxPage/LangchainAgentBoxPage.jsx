import React,{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, theme,Button} from 'antd';
import { UserButton, useUser } from '@clerk/clerk-react';
import LangchainAgentBox from '../../../components/LangchainAgentBox/LangchainAgentBox'


const { Header, Content } = Layout;


const LangchainAgentBoxPage = () => {

  const { user } = useUser(); // 获取用户信息

  const navigate = useNavigate();

  const [screenWidth, setScreenWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 1024; // 默认值
  });

  // 初始化时根据屏幕宽度设置折叠状态
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  // 添加响应式监听
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      
      if (width < 768) {
        !collapsed && setCollapsed(true);
      } else {
        collapsed && setCollapsed(false);
      }
    };
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [collapsed]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ 
          minHeight: '100vh', 
          }}>
      {/* 顶部导航栏 */}
      <Header style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          background: '#ffffff',
          borderBottom: '1px solid #f0f0f0', 
          }}>
        <div style={{ display: 'flex', alignItems: 'center',marginLeft:'-40px', flex: 'none' }}>
          <div 
            style={{
              fontSize: screenWidth < 768 ? '20px' : '26px',  // 响应式字体
              fontWeight: screenWidth < 768 ? 500 : 600,      // 响应式字重
              color: 'rgba(0, 0, 0, 0.9)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              letterSpacing: '-0.5px',
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              marginLeft: screenWidth < 768 ? '8px' : '12px',  // 响应式间距
              ':hover': {
                color: '#1890ff',
                textShadow: '0 2px 4px rgba(24, 144, 255, 0.15)'
              }
            }}
            >
              Investment Adviser
          </div>
        </div>
        <div className="auth-buttons" style={{ marginLeft: 'auto', display: 'flex', gap: 8}}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {screenWidth >= 768 && (
                <Button 
                  type="primary" 
                  ghost
                  onClick={() => navigate('/dashboard')}
                  style={{ marginRight: 8 }}
                >
                  Dashboard
                </Button>
              )}
              <span style={{ 
                fontSize: 14,
                display: screenWidth < 768 ? 'none' : 'block' // 手机端隐藏用户名
              }}>
                {user.fullName}
              </span>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
            </div>
          ) : (
            <Button type="primary" ghost>Get Started</Button>
          )}
        </div>
      </Header>
      <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          // fontSize: 'clamp(12px, 2vw, 14px)'
          }}>
        <Layout
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            // height: '100%',
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center', // 水平居中
          }}
        >
          <Content style={{
              marginTop: 64,
              transition: 'margin 0.2s',
              height: 'calc(100vh - 64px)',
              overflow: 'auto',
              position: 'relative'
            }}>
            <LangchainAgentBox />
          </Content>
        </Layout>
      </div>
    </Layout>
  );
};
export default LangchainAgentBoxPage;

   
