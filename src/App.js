import React, { useState, useEffect } from 'react';
import { CommentOutlined, GlobalOutlined, SlidersOutlined, MenuOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, Dropdown } from 'antd';
import logo from './assets/images/strategyai.svg';
import OpenaiChatBox from './components/OpenaiChatBox/OpenaiChatBox';
import DeepseekChatBox from './components/DeepseekChatBox/DeepseekChatBox';
import './App.css';

const { Header, Content } = Layout;

const menuItems = [
  { key: '1', label: 'openai', icon: <CommentOutlined /> },
  { key: '2', label: 'deepseek', icon: <GlobalOutlined /> },
  { key: '3', label: 'Strategy', icon: <SlidersOutlined /> }
];

const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState('1');

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const renderContent = () => {
    switch(selectedMenuKey) {
      case '1': return <OpenaiChatBox />;
      case '2': return <DeepseekChatBox />;
      default: return <OpenaiChatBox />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 顶部导航栏 */}
      <Header style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        background: '#001529'
      }}>
        {/* 电脑端布局 */}
        {!isMobile ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', flex: 1,marginLeft:'20px' }}>
              <img
                src={logo}
                alt="Logo"
                style={{
                  height: 40,
                  width: 'auto',
                  marginRight: 24
                }}
              />
              <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[selectedMenuKey]}
                onSelect={({ key }) => setSelectedMenuKey(key)}
                items={menuItems}
                style={{ 
                  flex: 1,
                  borderBottom: 'none',
                  lineHeight: '62px'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8,marginRight:'30px' }}>
              {/* <Button type="text" style={{ color: 'rgba(255,255,255,0.85)' }}>登录</Button> */}
              <Button type="primary" ghost>Get Started</Button>
            </div>
          </>
        ) : (
          /* 移动端布局 */
          <div style={{ 
            display: 'flex', 
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center' // 确保整体垂直居中
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Dropdown 
                menu={{
                  items: menuItems,
                  selectedKeys: [selectedMenuKey],
                  onClick: ({ key }) => setSelectedMenuKey(key)
                }} 
                trigger={['click']}>
                <Button 
                  type="text" 
                  icon={<MenuOutlined />}
                  style={{ 
                    color: 'white',
                    fontSize: 18,
                    width: 48,
                    height: 48
                  }}
                />
              </Dropdown>
            </div>

            <img
              src={logo}
              alt="Logo"
              style={{
                height: 32,
                width: 'auto',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                marginLeft:'-50px'
              }}
            />

            <div style={{ 
              display: 'flex', 
              gap: 8,
              alignItems: 'center', // 修复：按钮组垂直居中
              marginRight:'10px'
            }}>
              {/* <Button 
                type="text" 
                size="small"
                style={{ 
                  color: 'rgba(255,255,255,0.85)',
                  padding: '0 6px',
                  height: 32
                }}
              >
                登录
              </Button> */}
              <Button 
                type="primary" 
                ghost 
                size="small"
                style={{ height: 32 }}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </Header>

      {/* 内容区域 */}
      <Content style={{
        marginTop: 64,
        padding: 16,
        height: 'calc(100vh - 64px)',
        overflow: 'auto'
      }}>
        {renderContent()}
      </Content>
    </Layout>
  );
};

export default App;