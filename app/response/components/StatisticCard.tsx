'use client';

import React from "react";
import { Row, Col, Typography } from "antd";

const { Title, Text } = Typography;

interface StatisticCardProps {
  title: string;
  value: number;
  borderColor?: string;
}

export default function StatisticCard({ 
  title, 
  value, 
  borderColor = '#626dcf'
}: StatisticCardProps) {
  return (
    <Row 
      align="middle" 
      style={{ 
        width: "100%",
        margin: "16px 0",
        padding: "12px 16px",
        borderBottom: `3px solid ${borderColor}`,
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        position: 'relative',
        top: 0
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget;
        target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        target.style.top = '-2px';
        target.style.borderBottomWidth = '4px';
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget;
        target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
        target.style.top = '0px';
        target.style.borderBottomWidth = '3px';
      }}
    >
      <Col 
        span={12} 
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Title 
          level={5} 
          style={{
            margin: 0,
            fontSize: '13px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: '#1f1f1f'
          }}
        >
          {title}
        </Title>
      </Col>

      <Col span={12}>
        <div
          style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '8px 24px',
            minWidth: '120px',
            textAlign: 'center',
            border: '1px solid #f0f0f0',
            transition: 'transform 0.3s ease'
          }}
        >
          <Text
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: borderColor,
              margin: 0
            }}
          >
            {value}
          </Text>
        </div>
      </Col>
    </Row>
  );
} 