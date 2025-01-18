'use client';

import React, { useState } from "react";
import { Input, Button, Popover, Checkbox, Divider } from "antd";
import { SearchOutlined, FilterOutlined, RobotOutlined } from "@ant-design/icons";

interface FunctionalAreaSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function FunctionalAreaSearch({ searchTerm, setSearchTerm }: FunctionalAreaSearchProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const filterContent = (
    <div style={{ 
      padding: '12px', 
      minWidth: '250px',
      background: '#D0D3F1',
      borderRadius: '8px'
    }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#626DCF' }}>Selected Answers</h4>
        <Checkbox.Group
          options={[
            { label: 'Answered Questions', value: 'answered' },
            { label: 'Non-Answered Questions', value: 'non-answered' }
          ]}
          value={selectedAnswers}
          onChange={(values) => setSelectedAnswers(values as string[])}
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px',
            color: '#626DCF'
          }}
        />
      </div>
      
      <Divider style={{ margin: '12px 0', borderColor: '#9DA2D8' }} />
      
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: '#626DCF' }}>Select Functional Area</h4>
        <Checkbox.Group
          options={[
            { label: 'Vendor Management', value: 'vendor-management' },
            { label: 'Management', value: 'management' },
            { label: 'Vendor', value: 'vendor' }
          ]}
          value={selectedAreas}
          onChange={(values) => setSelectedAreas(values as string[])}
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px',
            color: '#626DCF'
          }}
        />
      </div>
    </div>
  );

  const buttonHeight = 40;

  return (
    <div style={{ 
      display: 'flex', 
      gap: '12px', 
      marginBottom: 20,
      width: '100%',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            borderRadius: "8px",
            height: buttonHeight,
            flex: 1,
            maxWidth: '800px'
          }}
        />
        <Popover 
          content={filterContent} 
          trigger="click" 
          placement="bottomRight"
          overlayStyle={{ width: '300px' }}
        >
          <Button 
            icon={<FilterOutlined />}
            style={{
              borderRadius: '8px',
              height: buttonHeight,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#D0D3F1',
              borderColor: '#D0D3F1',
              color: '#626DCF'
            }}
          >
            Filter
          </Button>
        </Popover>
      </div>

      <Button
        icon={<RobotOutlined />}
        style={{
          height: buttonHeight,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          border: '1px solid #8A2BE2',
          color: '#8A2BE2',
          borderRadius: '4px'
        }}
      >
        Refactor with AI
      </Button>
    </div>
  );
} 