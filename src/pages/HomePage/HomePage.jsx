import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography,Button } from 'antd';
import './HomePage.css'; 

const { Title, Paragraph } = Typography;

const HomePage = () => {

  const navigate = useNavigate();

  return (
    <div className="hero-section">
      <div className="hero-content">
        <Title level={1} className="main-title">
            Autonomous <span className="highlight-blue">Financial Agents</span><br/> 
            <span style={{ fontSize: '0.8em' }}>to Power Your Investments</span>
        </Title>
        <Paragraph className="sub-title">
            Collaborative AI Specialists Generating Stock Reports, News Insights & Predictive Analytics Through Natural Language
        </Paragraph>
        <Button 
          type="primary" 
          size="large"
          className="cta-button"
          style={{ 
            marginTop: '2rem',
            backgroundColor: '#000',
            borderColor: '#000',
            height: '54px',
            padding: '0 40px',
            fontSize: '1.3rem'
          }}
          onClick={() => navigate('/signup')}  
        >
          Get Started For Free
        </Button>
      </div>
    </div>
  );
};

export default HomePage;