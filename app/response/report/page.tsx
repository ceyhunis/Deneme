'use client';

import React from "react";
import { Typography, Card, Button } from "antd";
import ReportStats from "../components/ReportStats";
import ReportTable from "../components/ReportTable";

const { Title, Text } = Typography;

export default function ReportPage() {
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
        Report
      </Title>

      <ReportStats />
      <ReportTable />

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '40px',
        marginBottom: '20px'
      }}>
        <Card
          style={{
            backgroundColor: '#FDF0FF',
            borderRadius: '20px',
            maxWidth: '400px',
            border: 'none'
          }}
        >
          <div style={{ color: '#1f1f1f' }}>
            <Text 
              strong 
              style={{ 
                fontSize: '16px',
                display: 'block',
                marginBottom: '8px'
              }}
            >
              RFP Wizard
            </Text>
            <Text style={{ opacity: 0.9 }}>
              rfpwizard00000000@rfpwizard.tech
            </Text>
          </div>
        </Card>

        <Button
          type="primary"
          size="large"
          style={{
            backgroundColor: '#626DCF',
            borderColor: '#626DCF',
            height: '48px',
            padding: '0 32px',
            fontSize: '16px',
            borderRadius: '8px'
          }}
        >
          Send My Proposal
        </Button>
      </div>
    </main>
  );
}