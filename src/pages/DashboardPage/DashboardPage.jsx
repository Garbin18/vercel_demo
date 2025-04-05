import React,{ useState, useEffect } from 'react';
import { MessageOutlined} from '@ant-design/icons';
import { SlidersOutlined,GlobalOutlined,MenuFoldOutlined,MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, theme,Button} from 'antd';
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
                fontSize: '16px',
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
              style={{
                height: '30px',
                width: 'auto',
                objectFit: 'contain',
              }}
          />
        </div>
        <div className="auth-buttons" style={{ marginLeft: 'auto', display: 'flex', gap: 8}}>
          <Button 
            type="text" 
            style={{ color: 'black', fontWeight: 500 }}
          >
            登录
          </Button>
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
                width={260}>
              <Menu
                mode="inline" //垂直模式
                selectedKeys={[selectedMenuKey]}
                onSelect={({ key }) => setSelectedMenuKey(key)}
                defaultSelectedKeys={['1']}
                style={{height: '100%',background: 'transparent'}}
                items={sider_titles}
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

   
