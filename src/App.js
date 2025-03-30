import React,{ useState } from 'react';
import { OpenAIOutlined , MessageOutlined,PictureOutlined,FundViewOutlined,UserSwitchOutlined,HeartOutlined} from '@ant-design/icons';
import { CommentOutlined,SlidersOutlined,GlobalOutlined,MenuFoldOutlined,MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, theme,Button} from 'antd';
import logo from './assets/images/strategyai.svg';
import OpenaiChatBox from './components/OpenaiChatBox/OpenaiChatBox';
import DeepseekChatBox from './components/DeepseekChatBox/DeepseekChatBox';
import './App.css'

const { Header, Content, Sider } = Layout;
const header_titles = [
  { key: 1,label: 'Chat',icon: <CommentOutlined />},
  { key: 2,label: 'News',icon: <GlobalOutlined />},
  { key: 3,label: 'Strategy',icon: <SlidersOutlined />}
];
const sider_titles = [
  { key: 1,label: 'openai',icon: <OpenAIOutlined />},
  { key: 2,label: 'deepseek',icon: <MessageOutlined />},
  { key: 3,label: 'Collection',icon: <PictureOutlined />},
  { key: 4,label: 'Generate Image',icon: <FundViewOutlined />},
  { key: 5,label: 'Create Character',icon: <UserSwitchOutlined />},
  { key: 6,label: 'My AI',icon: <HeartOutlined />},
];

const App = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedMenuKey, setSelectedMenuKey] = useState('1');
  const {
    token: { colorBgContainer, borderRadiusLG ,colorBorder},
  } = theme.useToken();
  const renderContent = () => {
    switch(selectedMenuKey) {
      case '1':
        return <OpenaiChatBox />;
      case '2':
        return <DeepseekChatBox />;
      case '3':
        return <div>...</div>;
      default:
        return <div>...</div>;
    }
  };
  return (
    <Layout style={{ 
          minHeight: '100vh', 
          position: 'relative', // 添加相对定位
          }}>
      {/* 顶部导航栏 */}
      <Header style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
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
                color:'white',
                marginRight:'20px'
              }}
            />
          <img
              src={logo}
              className="header-logo"
              alt="Website Logo"
              style={{
                height: 'clamp(36px, 6vw, 60px)',
                width: 'auto',
                objectFit: 'contain',
                marginLeft:'-40px'
              }}
          />
          <Menu
            theme="dark"
            mode="horizontal"
            items={header_titles}
            defaultSelectedKeys={['1']}
            style={{ 
              flex: 1, 
              minWidth: 300,
              background: 'transparent',
              borderBottom: 'none',
              justifyContent: 'center', 
              marginLeft:'10px'
            }}
          />
        </div>
        {/* 新增登录注册按钮组 */}
        <div className="auth-buttons" style={{ marginLeft: 'auto', display: 'flex', gap: 8}}>
          <Button 
            type="text" 
            style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}
          >
            登录
          </Button>
          <Button 
            type="primary" 
            ghost
            style={{ fontWeight: 500 }}
          >
            注册
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
export default App;

   
