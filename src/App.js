import React, { useState, useEffect } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, Dropdown } from 'antd';
import logo from './assets/images/Remika.png';
import HomePage from './components/HomePage/HomePage';
// import OpenaiChatBox from './components/OpenaiChatBox/OpenaiChatBox';
// import DeepseekChatBox from './components/DeepseekChatBox/DeepseekChatBox';
import './App.css';

const { Header, Content } = Layout;

const menuItems = [
  { key: '1', label: 'Models' },
  { key: '2', label: 'Analyses' },
  { key: '3', label: 'News' }
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

  // const renderContent = () => {
  //   switch(selectedMenuKey) {
  //     case '1': return <OpenaiChatBox />;
  //     case '2': return <DeepseekChatBox />;
  //     default: return <OpenaiChatBox />;
  //   }
  // };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 顶部导航栏 */}
      <Header style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        height: 80,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        background: '#ffffff',
        borderBottom: '1px solid #f0f0f0', 
      }}>
        {/* 电脑端布局 */}
        {!isMobile ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', flex: 1, marginLeft:'350px',height: '100%' }}>
              <img
                src={logo}
                alt="Logo"
                style={{
                  height: 50,
                  width: 'auto',
                  marginRight: 34,
                  objectFit: 'contain'
                }}
              />
              <Menu
                theme="light"
                mode="horizontal"
                selectedKeys={[selectedMenuKey]}
                onSelect={({ key }) => setSelectedMenuKey(key)}
                items={menuItems}
                style={{ 
                  flex: 1,
                  borderBottom: 'none',
                  lineHeight: '78px',
                  fontSize: 17,
                  marginLeft:'20px'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8,marginRight:'430px' }}>
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
                  icon={<MenuOutlined style={{ color: 'rgba(0, 0, 0, 0.88)' }}/>}
                  style={{ 
                    color: 'white',
                    fontSize: 20,
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
                height: 40,
                width: 'auto',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                marginLeft:'-60px'
              }}
            />

            <div style={{ 
              display: 'flex', 
              gap: 8,
              alignItems: 'center', // 修复：按钮组垂直居中
              marginRight:'10px'
            }}>
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
        overflow: 'auto',
        background: '#ffffff',
      }}>
        {/* {renderContent()} */}
        <HomePage />
      </Content>
    </Layout>
  );
};

export default App;