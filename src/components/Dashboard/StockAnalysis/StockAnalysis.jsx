import React from 'react';
import { Button, Row, Col } from 'antd';
import { StockOutlined, TrademarkCircleOutlined, GlobalOutlined  } from '@ant-design/icons';

// 更新样式配置
const buttonStyle = {
  width: '100%',
  minHeight: 260,      // 增加最小高度
  background: '#ffffff',
  border: '1px solid #f0f0f0',
  borderRadius: 12,    // 增大圆角
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '16px',         // 元素间距
  transition: 'all 0.3s',
  textAlign: 'left',
  ':hover': {
    borderColor: '#1890ff',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(-4px)'
  }
};

const iconStyle = {
  fontSize: 50,
  color: '#1890ff',
  marginBottom: 24      // 减少图标下方间距
};

const titleStyle = {
  fontSize: 25,
  fontWeight: 600,     // 加粗标题
  color: 'rgba(0, 0, 0, 0.85)',
  lineHeight: 1.2,
};

const descStyle = {
  fontSize: 16,
  color: 'rgba(0, 0, 0, 0.6)',  // 加深描述文字颜色
  lineHeight: 1.6,
  width: '100%',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3    // 控制最大显示行数
};

const contentWrapper = {
  width: '100%' // 确保内容容器占满宽度
};

const StockAnalysis = () => {
  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={8} lg={8}>
          <Button 
            style={buttonStyle}
          >
            <div style={contentWrapper}>
              <StockOutlined style={iconStyle} />
              <div style={titleStyle}>US Equities</div>
              <p style={descStyle}>AI-driven institutional order tracking & short interest alerts 
                - Capitalize on S&P 500 momentum shifts before retail traders.</p>
            </div>
          </Button>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={8}>
          <Button 
            style={buttonStyle}
          >
            <div style={contentWrapper}>
              <TrademarkCircleOutlined style={iconStyle} />
              <div style={titleStyle}>Crypto</div>
              <p style={descStyle}>On-chain whale wallet surveillance & derivatives heatmapping 
                - Navigate BTC/ETH volatility with 85% historical accuracy models.
              </p>
            </div>
          </Button>
        </Col>
        
        <Col xs={24} sm={12} md={8} lg={8}>
          <Button 
            style={buttonStyle}
          >
            <div style={contentWrapper}>
              <GlobalOutlined style={iconStyle} />
              <div style={titleStyle}>HK Stocks</div>
              <p style={descStyle}>Mainland capital flow radar & policy risk scoring 
                - Identify Hang Seng Index bargains through cross-border liquidity signals.</p>
            </div>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default StockAnalysis;