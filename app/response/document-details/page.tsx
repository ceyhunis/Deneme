'use client';

import React from "react";
import InfoCard from "../components/InfoCard";
import { Typography, Card, Row, Col, Button, Input } from "antd";
import { CreditCardOutlined, PlusOutlined, SwapOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function DocumentDetailsPage() {
  return (
    <main style={{ 
      padding: '10px 20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <Title 
        level={2} 
        style={{ 
          color: '#626DCF',
          marginBottom: '24px'
        }}
      >
        Document Details
      </Title>

      <InfoCard />

      <Text 
        style={{ 
          color: '#626DCF',
          display: 'block',
          margin: '24px 0 12px',
          fontSize: '14px'
        }}
      >
        You logged as:
      </Text>

      <Card
        style={{
          backgroundColor: '#626DCF',
          borderRadius: '20px',
          maxWidth: '400px'
        }}
      >
        <div style={{ color: 'white' }}>
          <Text 
            strong 
            style={{ 
              color: 'white',
              fontSize: '16px',
              display: 'block',
              marginBottom: '8px'
            }}
          >
            RFP Wizard
          </Text>
          <Text style={{ color: 'white', opacity: 0.9 }}>
            rfpwizard00000000@rfpwizard.tech
          </Text>
        </div>
      </Card>

      <Title 
        level={3} 
        style={{ 
          color: '#626DCF',
          margin: '32px 0 24px',
          fontSize: '24px'
        }}
      >
        Payment
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={15}>
          <Title level={4} style={{ fontWeight: 600, color: '#1f1f1f', marginBottom: '20px' }}>
            Pay With
          </Title>
          
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            marginBottom: '32px',
            flexWrap: 'wrap'  // Butonlar sığmazsa alta geçsin
          }}>
            <Button
              icon={<CreditCardOutlined />}
              style={{
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#626DCF',
                borderColor: '#626DCF',
              }}
            >
              Credit Card
            </Button>
            <Button
              icon={<PlusOutlined />}
              style={{
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#626DCF',
                borderColor: '#626DCF'
              }}
            >
              Bank Card
            </Button>
            <Button
              icon={<SwapOutlined />}
              style={{
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#626DCF',
                borderColor: '#626DCF'
              }}
            >
              Transfer
            </Button>
          </div>

          <Title level={4} style={{ fontWeight: 600, color: '#1f1f1f', marginBottom: '20px' }}>
            Payment Details
          </Title>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px', 
            width: '100%',  // Tam genişlik
            maxWidth: '400px'  // Maksimum genişlik
          }}>
            <div>
              <Text style={{ display: 'block', marginBottom: '8px' }}>Card Number</Text>
              <Input placeholder="1234 5678 9012 3456" size="large" />
            </div>
            <div>
              <Text style={{ display: 'block', marginBottom: '8px' }}>Expiration Date</Text>
              <Input placeholder="MM/YY" size="large" />
            </div>
            <div>
              <Text style={{ display: 'block', marginBottom: '8px' }}>CVV</Text>
              <Input size="large" />
            </div>
          </div>
        </Col>

        <Col xs={24} md={9}>
          <Card
            style={{
              borderRadius: '20px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              padding: '24px'
            }}
          >
            <Title level={4} style={{ fontWeight: 600, color: '#1f1f1f', marginBottom: '20px' }}>
              Payment Summary
            </Title>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              marginBottom: '4px'
            }}>
              <Text style={{ fontSize: '16px' }}>Professional Subscription</Text>
              <Text style={{ color: '#666' }}>$48</Text>
            </div>

            <Text style={{ 
              fontSize: '12px', 
              color: '#666', 
              display: 'block', 
              marginBottom: '20px' 
            }}>
              member per month
            </Text>

            <div style={{ 
              display: 'flex', 
              gap: '8px', 
              marginBottom: '24px' 
            }}>
              <Input 
                placeholder="1234" 
                size="large" 
                style={{ flex: 1 }}
              />
              <Button
                style={{
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#626DCF',
                  borderColor: '#626DCF'
                }}
              >
                Apply
              </Button>
            </div>

            <div style={{ 
              borderTop: '1px solid #f0f0f0',
              paddingTop: '16px',
              marginBottom: '16px'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <Text>Subtotal</Text>
                <Text style={{ color: '#666' }}>$49.80</Text>
              </div>
            </div>

            <div style={{ 
              borderTop: '1px solid #f0f0f0',
              paddingTop: '16px'
            }}>
              <Row gutter={16} align="middle">
                <Col span={12}>
                  <Text strong style={{ fontSize: '16px', display: 'block' }}>
                    Total
                  </Text>
                  <Text style={{ 
                    fontSize: '12px', 
                    color: '#666'
                  }}>
                    Including $2.24 in taxes
                  </Text>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                  <Text strong style={{ 
                    fontSize: '24px',
                    color: '#626DCF'
                  }}>
                    $59.28
                  </Text>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>

      <div style={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center',
        padding: '40px 0'
      }}>
        <Button
          type="primary"
          size="large"
          style={{
            backgroundColor: '#626DCF',
            borderColor: '#626DCF',
            height: '48px',
            width: '100%',
            maxWidth: '400px',
            fontSize: '16px',
            borderRadius: '8px'
          }}
        >
          Pay Now
        </Button>
      </div>
    </main>
  );
} 