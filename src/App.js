// import ChatBox from './ChatBox'; // 确保路径正确
// import './ChatBox.css'; // 引入样式文件

import React from 'react';
import { SearchOutlined, MessageOutlined,PictureOutlined,FundViewOutlined,UserSwitchOutlined,HeartOutlined} from '@ant-design/icons';
import { ManOutlined, BilibiliOutlined, WomanOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import logo from './assets/images/realemika.jpg';

const { Header, Content, Sider } = Layout;
const items1 = [
  { key: 1,label: 'Girls',icon: <WomanOutlined />},
  { key: 2,label: 'Anime',icon: <BilibiliOutlined />},
  { key: 3,label: 'Guys',icon: <ManOutlined />}
];
const items2 = [
  { key: 1,label: 'Explore',icon: <SearchOutlined />},
  { key: 2,label: 'Chat',icon: <MessageOutlined />},
  { key: 3,label: 'Collection',icon: <PictureOutlined />},
  { key: 4,label: 'Generate Image',icon: <FundViewOutlined />},
  { key: 5,label: 'Create Character',icon: <UserSwitchOutlined />},
  { key: 6,label: 'My AI',icon: <HeartOutlined />},
];
const darkTheme = {
  backgroundColor: '#000000',
  textColor: '#ffffff',
  menuDarkBg: '#141414',
  footerBg: '#000000'
};

const App = () => {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh', display: 'flex',flexDirection: 'column',background: darkTheme.backgroundColor}}>
      {/* 顶部导航栏 */}
      <Header style={{display: 'flex',alignItems: 'center',background: darkTheme.backgroundColor, }}>
        <div style={{display: 'flex',alignItems: 'center',marginRight: 10,cursor: 'pointer'}} /> 
        <img
            src={logo}
            alt="Website Logo"
            style={{
              height: 58,
              width: 'auto',
              maxWidth: 180,
            }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items1}
          style={{flex: 1, minWidth: 0,background: 'transparent',borderBottom: 'none',color: darkTheme.textColor}}
        />
      </Header>
      <div style={{padding: '0 48px',flex: 1,display: 'flex',flexDirection: 'column'}}>
        <Layout
          style={{
            padding: '24px 0',
            background: darkTheme.backgroundColor,
            borderRadius: borderRadiusLG,
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}
        >
          <Sider style={{
              background: darkTheme.backgroundColor,
              height: '100%',
              borderRight: '1px solid rgba(255,255,255,0.08)'
            }} 
              width={200}>
            <Menu
              mode="inline" //垂直模式
              theme="dark"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{height: '100%',background: 'transparent',color: darkTheme.textColor}}
              items={items2}
            />
          </Sider>
          <Content style={{
              padding: '0 24px',
              minHeight: 280,
              bottom: 0,
              background: darkTheme.backgroundColor,
              color: darkTheme.textColor
            }}>
            Content
          </Content>
        </Layout>
      </div>
    </Layout>
  );
};
export default App;

// function App() {
//   return (
//     <div className="App">
//       <h1>AI 助手</h1>
//       <ChatBox />
//     </div>
//   );
// }

// export default App;

   
