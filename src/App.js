import React,{ useState } from 'react';
import { SearchOutlined, MessageOutlined,PictureOutlined,FundViewOutlined,UserSwitchOutlined,HeartOutlined} from '@ant-design/icons';
import { ManOutlined, BilibiliOutlined, WomanOutlined,MenuFoldOutlined,MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, theme,Button} from 'antd';
import logo from './assets/images/strategyai.svg';
import ChatBox from './ChatBox'; 
import './ChatBox.css'; 

const { Header, Content, Sider } = Layout;
const header_titles = [
  { key: 1,label: 'Girls',icon: <WomanOutlined />},
  { key: 2,label: 'Anime',icon: <BilibiliOutlined />},
  { key: 3,label: 'Guys',icon: <ManOutlined />}
];
const sider_titles = [
  { key: 1,label: 'Chat',icon: <SearchOutlined />},
  { key: 2,label: 'Explore',icon: <MessageOutlined />},
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
        return <ChatBox />;
      case '2':
        return <div>Anime Content</div>;
      case '3':
        return <div>Guys Content</div>;
      default:
        return <div>Default Content</div>;
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
              height: 100,
              width: 'auto',
              maxWidth: 240,
              marginLeft:'-20px'
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
          // defaultSelectedKeys={['1']}
          selectedKeys={[selectedMenuKey]}
          items={header_titles}
          onSelect={({ key }) => setSelectedMenuKey(key)}
          style={{flex: 1, minWidth: 0,background: 'transparent',borderBottom: 'none'}}
        />
      </Header>
      <div style={{flex: 1,display: 'flex',flexDirection: 'column',overflow: 'hidden',position: 'relative'}}>
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
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{height: '100%',background: 'transparent',paddingLeft:'10px'}}
                items={sider_titles}
              />
            </Sider>
          </div>
          <Content style={{
              margin: 0,
              padding: 0,
              flex: 1,
              display: 'flex',
              overflow: 'hidden'
              // margin: '16px 16px',
              // padding: '0 24px',
              // minHeight: 280,
              // bottom: 0,
            }}>
            {renderContent()}
          </Content>
        </Layout>
      </div>
    </Layout>
  );
};
export default App;

   
