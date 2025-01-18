'use client';

import React, { useState, useEffect } from "react";
import { Table, Tabs, Select, Skeleton } from "antd";
import { ApiResponse } from "@/types/general_types";
import { DynamicRouter } from "@/utils/request_utils";
import useSWR from "swr";

const { TabPane } = Tabs;
const { Option } = Select;

interface FunctionalAreaTableProps {
  searchTerm: string;
  business_cycle_ids: any[];
  setBusinessCycle_ids: (value: any[]) => void;
  functional_area_ids: any[];
  setFunctionalArea_ids: (value: any[]) => void;
  setSelectedFunctionalAreas: (value: any[]) => void;
}

export default function FunctionalAreaTable({ 
  searchTerm,
  business_cycle_ids,
  setBusinessCycle_ids,
  functional_area_ids,
  setFunctionalArea_ids,
  setSelectedFunctionalAreas
}: FunctionalAreaTableProps) {
  const defaultCycle = business_cycle_ids[0] || null;
  const [selectedCycle, setSelectedCycle] = useState(defaultCycle);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [priorityValues, setPriorityValues] = useState<Record<string, string>>({});
  const [displayedFunctionalAreas, setDisplayedFunctionalAreas] = useState<any>([]);

  const url = DynamicRouter("project", "functional-area");
  const { data, isLoading } = useSWR<ApiResponse<any>>(url);

  useEffect(() => {
    if (data?.data && selectedCycle) {
      const filteredFunctionalAreas = data.data.filter(
        (item) => item.business_cycle_id === selectedCycle.id
      );
      setDisplayedFunctionalAreas(filteredFunctionalAreas);
    }
    if (!selectedCycle && business_cycle_ids.length > 0) {
      setSelectedCycle(business_cycle_ids[0]);
    }
  }, [data, selectedCycle, business_cycle_ids]);

  const handlePriorityChange = (value: string, record: any) => {
    setPriorityValues((prev) => ({
      ...prev,
      [record.id]: value,
    }));

    setSelectedRows((prevRows) => {
      const updatedRows = prevRows.map((row) =>
        row.id === record.id ? { ...row, priority: value } : row
      );
      setSelectedFunctionalAreas(updatedRows);
      setFunctionalArea_ids(updatedRows);
      return updatedRows;
    });
  };

  const rowSelection = {
    selectedRowKeys: selectedRows.map((row) => row.id),
    onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
      const updatedRows = selectedRows.map(row => ({
        ...row,
        priority: priorityValues[row.id] || 'low',
        business_cycle_id: selectedCycle?.id
      }));
      
      setSelectedRows(updatedRows);
      setSelectedFunctionalAreas(updatedRows);
      setFunctionalArea_ids(updatedRows);
    },
  };

  const columns = [
    {
      title: "Functional Area",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Functionality Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (text: string, record: any) => {
        const value = priorityValues[record.id] || text || "low";
        const colors = {
          low: { bg: "#f0f9f0", text: "green" },
          medium: { bg: "#fff7e6", text: "orange" },
          high: { bg: "#fff1f0", text: "red" }
        };
        
        return (
          <Select
            value={value}
            onChange={(value) => handlePriorityChange(value, record)}
            className={`priority-select ${value}`}
            style={{ 
              width: 120,
              backgroundColor: colors[value as keyof typeof colors].bg,
              color: colors[value as keyof typeof colors].text,
              borderColor: colors[value as keyof typeof colors].text
            }}
          >
            <Option 
              value="low" 
              className="priority-option"
              style={{ backgroundColor: "#f0f9f0", color: "green" }}
            >
              Low
            </Option>
            <Option 
              value="medium" 
              className="priority-option"
              style={{ backgroundColor: "#fff7e6", color: "orange" }}
            >
              Medium
            </Option>
            <Option 
              value="high" 
              className="priority-option"
              style={{ backgroundColor: "#fff1f0", color: "red" }}
            >
              High
            </Option>
          </Select>
        );
      },
    },
  ];

  if (isLoading) {
    return <Skeleton.Input active />;
  }

  return (
    <>
      <Tabs
        defaultActiveKey={defaultCycle?.name || ""}
        onChange={(key) => {
          const cycle = business_cycle_ids.find((cycle) => cycle.name === key);
          setSelectedCycle(cycle || null);
        }}
        style={{ marginBottom: "20px" }}
        type="card"
      >
        {business_cycle_ids.map((cycle) => (
          <TabPane tab={cycle.name} key={cycle.name} />
        ))}
      </Tabs>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={displayedFunctionalAreas.filter((area: any) =>
          area.name.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        pagination={{ pageSize: 5 }}
        rowKey="id"
        className="custom-table"
        style={{
          width: "100%",
          border: "1px solid #EAEAEA",
          borderRadius: "8px",
          overflowX: "auto",
        }}
        scroll={{ x: true }}
      />
    </>
  );
} 