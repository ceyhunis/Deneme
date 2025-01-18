'use client';

import React from "react";
import { Table } from "antd";
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  businessCycle: string;
  available: number;
  custom: number;
  extension: number;
  notAvailable: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'BUSINESS CYCLE',
    dataIndex: 'businessCycle',
    key: 'businessCycle',
    width: '30%',
  },
  {
    title: 'AVAILABLE',
    dataIndex: 'available',
    key: 'available',
    align: 'center',
  },
  {
    title: 'CUSTOM',
    dataIndex: 'custom',
    key: 'custom',
    align: 'center',
  },
  {
    title: 'EXTENSION',
    dataIndex: 'extension',
    key: 'extension',
    align: 'center',
  },
  {
    title: 'NOT AVAILABLE',
    dataIndex: 'notAvailable',
    key: 'notAvailable',
    align: 'center',
  },
];

const data: DataType[] = [
  {
    key: '1',
    businessCycle: 'Lorem Ipsum Dolor',
    available: 42,
    custom: 15,
    extension: 8,
    notAvailable: 12,
  },
  {
    key: '2',
    businessCycle: 'Sit Amet Consectetur',
    available: 35,
    custom: 22,
    extension: 5,
    notAvailable: 18,
  },
  {
    key: '3',
    businessCycle: 'Adipiscing Elit',
    available: 28,
    custom: 19,
    extension: 11,
    notAvailable: 9,
  },
  {
    key: '4',
    businessCycle: 'Sed Tempor Incididunt',
    available: 51,
    custom: 13,
    extension: 7,
    notAvailable: 15,
  },
  {
    key: '5',
    businessCycle: 'Labore Magna',
    available: 33,
    custom: 25,
    extension: 14,
    notAvailable: 21,
  },
];

export default function ReportTable() {
  return (
    <Table 
      columns={columns} 
      dataSource={data} 
      pagination={false}
      style={{
        marginTop: '32px',
        width: '100%',
        border: '1px solid #EAEAEA',
        borderRadius: '8px',
        overflowX: 'auto'
      }}
      className="custom-table"
      scroll={{ x: true }}
    />
  );
} 