'use client';

import React from "react";
import { useGenerateContext } from "@/lib/providers/GenerateContextProvider";
import { Row, Col, Button } from "antd";
import FunctionalAreaTable from "./FunctionalAreaTable";
import FunctionalAreaSearch from "./FunctionalAreaSearch";
import InfoCard from "./InfoCard";
import StatisticCard from "./StatisticCard";

export default function ResponseCheck() {
  const {
    business_cycle_ids,
    setBusinessCycle_ids,
    functional_area_ids,
    setFunctionalArea_ids,
    setSelectedFunctionalAreas,
  } = useGenerateContext();

  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <div style={{ 
      padding: '10px 20px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <div style={{ flex: 1 }}>
        <InfoCard />
        
        <div style={{ margin: '24px 0' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <StatisticCard 
                title="Total" 
                value={156} 
                borderColor="#121bda" 
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <StatisticCard 
                title="Answered" 
                value={24} 
                borderColor="#05d9b1" 
              />
            </Col>
            <Col xs={24} sm={24} md={8}>
              <StatisticCard 
                title="Not-Answered" 
                value={85} 
                borderColor="#626dcf" 
              />
            </Col>
          </Row>
        </div>

        <div style={{ 
          width: '100%',
          overflowX: 'auto',
          minWidth: 0
        }}>
          <div style={{ minWidth: '750px' }}>
            <FunctionalAreaSearch 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
            />
            <FunctionalAreaTable 
              searchTerm={searchTerm}
              business_cycle_ids={business_cycle_ids}
              setBusinessCycle_ids={setBusinessCycle_ids}
              functional_area_ids={functional_area_ids}
              setFunctionalArea_ids={setFunctionalArea_ids}
              setSelectedFunctionalAreas={setSelectedFunctionalAreas}
            />
          </div>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid #f0f0f0',
        padding: '16px 0',
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        <Button
          style={{
            borderColor: '#626DCF',
            color: '#626DCF'
          }}
        >
          Save as Draft
        </Button>
        <Button
          type="primary"
          style={{
            backgroundColor: '#626DCF',
            borderColor: '#626DCF'
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
} 