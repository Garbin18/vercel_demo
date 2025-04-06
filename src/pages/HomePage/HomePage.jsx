import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography,Button } from 'antd';
import InvestmentAdviser from '../../components/Dashboard/InvestmentAdviser/InvestmentAdviser';
import StockAnalysis from '../../components/Dashboard/StockAnalysis/StockAnalysis';
import RealtimeNews from '../../components/Dashboard/RealtimeNews/RealtimeNews';
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
            marginTop: '2.2rem',
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
      <Title 
          id="adviser-section"
          level={2} 
          className="free-tools-title"
          style={{ 
            margin: '3rem 0 1rem',
            fontSize: '1.6rem',
            textAlign: 'center'
          }}
        >
          Investment Adviser
        </Title>
      <div className="homepage-investment-adviser">
          <InvestmentAdviser />
      </div>
      <Title 
        id="analyses-section"
        level={2} 
        className="free-tools-title"
        style={{ 
          margin: '3rem 0 1rem',
          fontSize: '1.6rem',
          textAlign: 'center'
        }}
      >
        Stock Analysis
      </Title>
      <div className="homepage-investment-adviser">
          <StockAnalysis />
      </div>
      <Title 
        id="news-section"
        level={2} 
        className="free-tools-title"
        style={{ 
          margin: '3rem 0 1rem',
          fontSize: '1.6rem',
          textAlign: 'center'
        }}
      >
        Realtime News
      </Title>
      <div className="homepage-investment-adviser">
          <RealtimeNews />
      </div>
    </div>
  );
};

export default HomePage;