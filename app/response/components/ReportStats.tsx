'use client';

import React from "react";
import { Row, Col, Typography } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useMediaQuery } from 'react-responsive';

const { Text } = Typography;

interface StatCardProps {
  numerator: number;
  denominator: number;
  backgroundColor: string;
  textColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ numerator, denominator, backgroundColor, textColor }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 992px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <div
      style={{
        backgroundColor,
        borderRadius: '12px',
        padding: '24px',
        height: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text style={{ color: textColor, fontWeight: 'bold' }}>
        <span style={{ fontSize: isMobile ? '72px' : isTabletOrMobile ? '48px' : '72px' }}>
          {numerator}
        </span>
        <span style={{ fontSize: isMobile ? '24px' : isTabletOrMobile ? '18px' : '24px' }}>
          /
        </span>
        <span style={{ fontSize: isMobile ? '24px' : isTabletOrMobile ? '18px' : '24px' }}>
          {denominator}
        </span>
      </Text>
    </div>
  );
};

const TimeCard: React.FC<{ time: string; backgroundColor: string }> = ({ time, backgroundColor }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 992px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <div
      style={{
        backgroundColor,
        borderRadius: '12px',
        padding: '24px',
        height: '120px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}
    >
      <ClockCircleOutlined style={{ fontSize: isMobile ? '24px' : isTabletOrMobile ? '20px' : '24px', color: 'white' }} />
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: isMobile ? '24px' : isTabletOrMobile ? '20px' : '24px' }}>
        {time}
      </Text>
    </div>
  );
};

export default function ReportStats() {
  const stats = [
    {
      title: 'Answered Questions',
      numerator: 120,
      denominator: 164,
      backgroundColor: '#B4F4E8',
      textColor: '#1C5A4E'
    },
    {
      title: 'Non-Answered Questions',
      numerator: 44,
      denominator: 164,
      backgroundColor: '#FEE8D8',
      textColor: '#FFB580'
    },
    {
      title: 'Standart Functionality',
      numerator: 120,
      denominator: 164,
      backgroundColor: '#FDF0FF',
      textColor: '#8C79B6'
    },
    {
      title: 'Remaining Time',
      time: '2 days 18 hours',
      backgroundColor: '#626DCF',
      textColor: 'white'
    }
  ];

  return (
    <div style={{ marginBottom: '32px' }}>
      <Row gutter={[24, 8]}>
        {stats.map((stat, index) => (
          <Col key={index} xs={24} sm={12} md={6}>
            <div style={{ height: '100%' }}>
              <Text strong style={{ fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                {stat.title}
              </Text>
              {index === 3 ? (
                <TimeCard
                  time={stat.time!}
                  backgroundColor={stat.backgroundColor}
                />
              ) : (
                <StatCard
                  numerator={stat.numerator!}
                  denominator={stat.denominator!}
                  backgroundColor={stat.backgroundColor}
                  textColor={stat.textColor}
                />
              )}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}