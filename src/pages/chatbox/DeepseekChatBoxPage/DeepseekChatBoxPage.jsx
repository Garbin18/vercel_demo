import React,{ useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageOutlined,HomeOutlined} from '@ant-design/icons';
import { MenuFoldOutlined,MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, theme,Button} from 'antd';
import { UserButton, useUser } from '@clerk/clerk-react';
import DeepseekChatBox from '../../../components/DeepseekChatBox/DeepseekChatBox'


const { Header, Content, Sider } = Layout;

const sider_titles = [
  { key: 1,label: 'Chat 01',icon: <MessageOutlined />},
  // { key: 2,label: 'Chat 02'},
  // { key: 3,label: 'Chat 03'},
];

const DeepseekChatBoxPage = () => {

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

  const [selectedMenuKey, setSelectedMenuKey] = useState('1');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const renderContent = () => {
    switch(selectedMenuKey) {
        case '1':
            return <DeepseekChatBox />;
            // case '2':
            // return <OpenaiChatBox />;
            // case '3':
            // return <OpenaiChatBox />;
            default:
            return <DeepseekChatBox />;
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
            overflow: 'hidden'
          }}
        >
          <div style={{
              position: 'fixed',
              zIndex: 1001,  // 提高zIndex确保在内容上方
              left: collapsed ? '-100%' : 0,
              top: 64,
              bottom: 0,
              transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '4px 0 12px rgba(0, 0, 0, 0.1)', // 添加阴影增强层次感
              '@media (min-width: 768px)': {
                position: 'relative',
                left: 'auto',
                boxShadow: 'none'
              }
          }}>
            <Sider 
              collapsible 
              trigger={null} 
              collapsed={collapsed}
              collapsedWidth={0}  // 添加这个属性
              style={{
                height: '100%',
                background: colorBgContainer,
                padding: '12px 0',
                overflow: 'auto',
                // '::-webkit-scrollbar': {
                //   display: 'none'
                // },
                scrollbarWidth: 'none',  // Firefox
                msOverflowStyle: 'none', // IE/Edge
                // borderRight: `1px solid ${colorBorder}`, 
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
                  // '& .antMenuTitleContent': {
                  // // '& .ant-menu-title-content': {
                  //   display: 'flex',
                  //   alignItems: 'center'
                  // }
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
              <div style={{
                padding: '12px 24px',
                borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                background: colorBgContainer,
                position: 'sticky',
                bottom: 0,
                zIndex: 1
                }}>
                <Button 
                  block
                  type="text"
                  icon={<HomeOutlined />} 
                  onClick={() => navigate('/')}
                  style={{
                    height: 30,
                    fontSize: 16,
                    textAlign: 'left',
                    paddingLeft: 24
                  }}
                >
                  {!collapsed && 'Home'}
                </Button>
              </div>
            </Sider>
          </div>
          {collapsed === false && screenWidth < 768 && (
          <div 
            style={{
              position: 'fixed',
              top: 64,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(2px)',
              transition: 'opacity 0.3s'
            }}
            onClick={() => setCollapsed(true)}
          />
          )}
          <Content style={{
              marginLeft: screenWidth >= 768 ? (collapsed ? 0 : 280) : 0,
              marginTop: 64,
              transition: 'margin 0.2s',
              height: 'calc(100vh - 64px)',
              overflow: 'auto',
              position: 'relative'
            }}>
            {renderContent()}
          </Content>
        </Layout>
      </div>
    </Layout>
  );
};
export default DeepseekChatBoxPage;

   
