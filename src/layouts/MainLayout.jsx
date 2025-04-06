import React from 'react';
import { Outlet,useNavigate  } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
// import { MenuOutlined } from '@ant-design/icons';
import { UserButton, useUser } from '@clerk/clerk-react';
import logo from '../assets/images/Remika.png';

const { Header, Content } = Layout;

const menuItems = [
  { key: 'adviser', label: 'Adviser' },
  { key: 'analyses', label: 'Analyses' },
  { key: 'news', label: 'News' }
];

const MainLayout = () => {

  const contentRef = React.useRef();

  const [isMobile, setIsMobile] = React.useState(false);
  // const [selectedMenuKey, setSelectedMenuKey] = React.useState('1');
  const [selectedMenuKey] = React.useState('1');

  const { user } = useUser(); // 获取用户信息

  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section && contentRef.current) {
      const headerHeight = 80;
      const sectionTop = section.offsetTop - headerHeight;
      contentRef.current.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
  };

  // 修改菜单点击处理
  const handleMenuSelect = ( key ) => {
    switch(key) {
      case 'adviser':
        scrollToSection('adviser-section');
        break;
      case 'analyses':
        scrollToSection('analyses-section');
        break;
      case 'news':
        scrollToSection('news-section');
        break;
      default:
        break;
    }
  };

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
            <div style={{ display: 'flex', alignItems: 'center', flex: 1, marginLeft:'250px', height: '100%' }}>
              <img
                src={logo}
                alt="Logo"
                style={{ height: 30, width: 'auto', marginRight: 34, objectFit: 'contain' }}
              />
              <Menu
                theme="light"
                mode="horizontal"
                selectedKeys={[selectedMenuKey]}
                onSelect={({ key }) => handleMenuSelect(key)}
                // onSelect={({ key }) => setSelectedMenuKey(key)}
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
            <div style={{ display: 'flex', gap: 8, marginRight:'200px', alignItems: 'center' }}>
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
            <div style={{ display: 'flex', alignItems: 'center',marginRight:5 }}>
              {/* <Dropdown 
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
              </Dropdown> */}
            </div>
            <img
              src={logo}
              alt="Logo"
              style={{
                height: 30,
                width: 'auto',
                position: 'absolute',
                transform: 'translateX(-50%)',
                marginLeft:'80px'
              }}
            />
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginRight:'10px' }}>
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Button 
                    type="primary" 
                    ghost
                    onClick={() => navigate('/dashboard')}
                    style={{ marginRight: 5,marginLeft:5 }}
                  >
                    Dashboard
                  </Button>
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8" // 移动端头像稍小
                      }
                    }}
                  />
                </div>
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
      <Content 
        ref={contentRef}
        style={{
          marginTop: 80,
          padding: 16,
          height: 'calc(100vh - 80px)',
          overflow: 'auto',
          background: '#ffffff',
        }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainLayout;