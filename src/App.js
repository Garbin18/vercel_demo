import React,{ useState } from 'react';
import { OpenAIOutlined , MessageOutlined,PictureOutlined,FundViewOutlined,UserSwitchOutlined,HeartOutlined} from '@ant-design/icons';
import { SlidersOutlined, GlobalOutlined, CommentOutlined,MenuFoldOutlined,MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, theme,Button} from 'antd';
import logo from './assets/images/strategyai.svg';
import OpenaiChatBox from './components/OpenaiChatBox/OpenaiChatBox';
import DeepseekChatBox from './components/DeepseekChatBox/DeepseekChatBox';

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
          display: 'flex',
          flexDirection: 'column',}}>
      {/* 顶部导航栏 */}
      <Header style={{display: 'flex',alignItems: 'center',}}>
        <img
            src={logo}
            alt="Website Logo"
            style={{
              // height: 100,
              height: 'clamp(36px, 6vw, 60px)',
              width: 'auto',
              objectFit: 'contain',
              // maxWidth: 240,
              marginLeft:'-40px'
            }}
        />
        <div style={{marginLeft:'-20px'}}>
          <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
                color:'white'
              }}
            />
          </div>
        <Menu
          theme="dark"
          mode="horizontal"
          items={header_titles}
          defaultSelectedKeys={['1']}
          style={{flex: 1, minWidth: 0,background: 'transparent',borderBottom: 'none'}}
        />
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
          <div style={{border: `1px solid ${colorBorder}`,}}>
            <Sider 
              collapsible 
              trigger={null} 
              collapsed={collapsed}
              style={{
                height: '100%',
                background: colorBgContainer,
                padding: '12px 0',
              }} 
                width={260}>
              <Menu
                mode="inline" //垂直模式
                selectedKeys={[selectedMenuKey]}
                onSelect={({ key }) => setSelectedMenuKey(key)}
                defaultSelectedKeys={['1']}
                style={{height: '100%',background: 'transparent',paddingLeft:'10px'}}
                items={sider_titles}
              />
            </Sider>
          </div>
          <Content style={{
              padding: 0,
              flex: 1,
              display: 'flex',
              overflow: 'hidden',
              // margin: '16px 36px',
            }}>
            {renderContent()}
          </Content>
        </Layout>
      </div>
    </Layout>
  );
};
export default App;

   
