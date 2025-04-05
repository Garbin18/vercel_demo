import React from 'react';
import { Outlet,useNavigate  } from 'react-router-dom';
import { Layout, Menu, Button, Dropdown } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { UserButton, useUser } from '@clerk/clerk-react';
import logo from '../assets/images/Remika.png';

const { Header, Content } = Layout;

const menuItems = [
  { key: '1', label: 'Models' },
  { key: '2', label: 'Analyses' },
  { key: '3', label: 'News' }
];

const MainLayout = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = React.useState('1');
  const { user } = useUser(); // 获取用户信息
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

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
        {!isMobile ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', flex: 1, marginLeft:'350px', height: '100%' }}>
              <img
                src={logo}
                alt="Logo"
                style={{ height: 30, width: 'auto', marginRight: 34, objectFit: 'contain' }}
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
            <div style={{ display: 'flex', gap: 8, marginRight:'430px', alignItems: 'center' }}>
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Button 
                    type="primary" 
                    ghost
                    onClick={() => navigate('/dashboard')}
                    style={{ marginRight: 8 }}
                  >
                    Dashboard
                  </Button>
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
                <Button 
                  type="primary" ghost
                  onClick={() => navigate('/signup')}
                  >
                  Get Started
                </Button>
              )}
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Dropdown 
                menu={{
                  items: menuItems,
                  selectedKeys: [selectedMenuKey],
                  onClick: ({ key }) => setSelectedMenuKey(key)
                }} 
                trigger={['click']}
              >
                <Button 
                  type="text" 
                  icon={<MenuOutlined style={{ color: 'rgba(0, 0, 0, 0.88)' }}/>}
                  style={{ fontSize: 20, width: 48, height: 48 }}
                />
              </Dropdown>
            </div>
            <img
              src={logo}
              alt="Logo"
              style={{
                height: 30,
                width: 'auto',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                marginLeft:'-40px'
              }}
            />
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginRight:'10px' }}>
              {user ? (
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8" // 移动端头像稍小
                    }
                  }}
                />
              ) : (
                <Button 
                  type="primary" 
                  ghost size="small" 
                  style={{ height: 32 }}
                  onClick={() => navigate('/signup')}
                  >
                  Get Started
                </Button>
              )}
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
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainLayout;