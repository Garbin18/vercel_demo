import React,{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageOutlined} from '@ant-design/icons';
import { SlidersOutlined,GlobalOutlined,MenuFoldOutlined,MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, theme,Button} from 'antd';
import { UserButton, useUser } from '@clerk/clerk-react';
import InvestmentAdviser from '../../components/Dashboard/InvestmentAdviser/InvestmentAdviser';
import StockAnalysis from '../../components/Dashboard/StockAnalysis/StockAnalysis';
import RealtimeNews from '../../components/Dashboard/RealtimeNews/RealtimeNews';
import logo from '../../assets/images/Remika.png';

const { Header, Content, Sider } = Layout;

const sider_titles = [
  { key: 1,label: 'Investment Adviser',icon: <MessageOutlined />},
  { key: 2,label: 'Stork Analysis',icon: <SlidersOutlined />},
  { key: 3,label: 'Realtime News',icon: <GlobalOutlined />},
];

const DashboardPage = () => {

  const { user } = useUser(); // 获取用户信息

  const navigate = useNavigate();

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
      if (window.innerWidth < 768) {
        !collapsed && setCollapsed(true);
      } else {
        collapsed && setCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [collapsed]);

  const [selectedMenuKey, setSelectedMenuKey] = useState('1');

  const {
    token: { colorBgContainer, borderRadiusLG ,colorBorder},
  } = theme.useToken();

  const renderContent = () => {
    switch(selectedMenuKey) {
        case '1':
            return <InvestmentAdviser />;
            case '2':
            return <StockAnalysis />;
            case '3':
            return <RealtimeNews />;
            default:
            return <InvestmentAdviser />;
    }
  };

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
          <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '20px',
                width: 64,
                height: 64,
                color:'black',
                marginRight:'10px'
              }}
            />
          <img
              src={logo}
              className="header-logo"
              alt="Website Logo"
              onClick={() => navigate('/')}
              style={{
                height: '30px',
                width: 'auto',
                objectFit: 'contain',
                cursor: 'pointer' // 添加指针样式
              }}
          />
        </div>
        <div className="auth-buttons" style={{ marginLeft: 'auto', display: 'flex', gap: 8}}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 14 }}>{user.fullName}</span>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10" // 控制头像大小
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
            overflow: 'hidden'
          }}
        >
          <div style={{
              border: `1px solid ${colorBorder}`,
              position: 'fixed',
              bottom: 0,
              zIndex: 1,
              left: 0,
              top: 64,
              }}>
            <Sider 
              collapsible 
              trigger={null} 
              collapsed={collapsed}
              style={{
                height: '100%',
                background: colorBgContainer,
                padding: '12px 0',
                overflow: 'auto',
              }} 
                width={280}>
              <Menu
                mode="inline" //垂直模式
                selectedKeys={[selectedMenuKey]}
                onSelect={({ key }) => setSelectedMenuKey(key)}
                defaultSelectedKeys={['1']}
                style={{
                  height: '100%',
                  background: 'transparent',
                  fontSize: '18px',
                  '& .ant-menu-title-content': {
                    display: 'flex',
                    alignItems: 'center'
                  }
                }}
                // items={sider_titles}
                items={sider_titles.map(item => ({
                  ...item,
                  style: { 
                    height: 70,        // 菜单项高度
                    lineHeight: '60px' // 文字垂直居中
                  }
                }))}
              />
            </Sider>
          </div>
          <Content style={{
              marginLeft: collapsed ? 80 : 260,
              marginTop: 64,
              transition: 'margin 0.2s',
              height: 'calc(100vh - 64px)',
              overflow: 'hidden',
              position: 'relative'
            }}>
            {renderContent()}
          </Content>
        </Layout>
      </div>
    </Layout>
  );
};
export default DashboardPage;

   
