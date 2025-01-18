'use client';

import React from "react";
import { Card, Row, Col, Typography, Tag } from "antd";
import { MessageOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function InfoCard() {
  return (
    <Card
      style={{
        width: "100%",
        margin: "20px auto",
        position: "relative",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        padding: "12px 16px",
        border: "1px solid #626dcf",
        borderRadius: "20px",
        minHeight: "90px",
        borderLeft: "20px solid #626dcf",
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <Row gutter={[24, 24]} align="middle" style={{ width: "100%", margin: 0 }}>
        <Col xs={24} sm={24} md={12}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Title level={5} style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>Check</Title>
            <Text style={{ 
              fontSize: '14px',
              color: '#666',
              margin: 0
            }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
            </Text>
          </div>
        </Col>

        <Col xs={24} sm={12} md={6} style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <Title level={5} style={{ margin: 0, marginBottom: '4px', fontSize: '15px', fontWeight: 600 }}>Company</Title>
            <Tag color="#13c2c2" style={{ 
              padding: '5px 12px',
              borderRadius: '4px',
              fontSize: '14px',
              margin: 0
            }}>
              <MessageOutlined style={{ marginRight: '8px' }} />
              Algofact
            </Tag>
          </div>
        </Col>

        <Col xs={24} sm={12} md={6} style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <Title level={5} style={{ margin: 0, marginBottom: '4px', fontSize: '15px', fontWeight: 600 }}>Company Website (URL)</Title>
            <Text style={{ 
              fontSize: '14px',
              color: '#1890ff',
              wordBreak: 'break-all',
              margin: 0
            }}>
              https://www.google.com
            </Text>
          </div>
        </Col>
      </Row>
    </Card>
  );
} 