'use client';

import { Card } from "antd";
import React from "react";
import { CalendarOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

const getRandomColor = () => {
  const colors = ["#626dcf", "#2bbf5f", "#e5e5e5"];
  return colors[Math.floor(Math.random() * colors.length)];
};

interface ProductCardProps {
  item: {
    id: string;
    rfp_name: string;
    rfp_description: string;
    created_at: string;
  };
}

export default function ProductCard({ item }: ProductCardProps) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format("DD MMM YY");
  };

  const initialShadow = "0 20px 20px rgba(0, 0, 0, 0.25)";

  return (
    <Card
      hoverable
      style={{
        borderLeft: `7px solid ${getRandomColor()}`,
        width: "100%",
        maxWidth: "400px",
        minWidth: "320px",
        maxHeight: "200px",
        minHeight: "190px",
        margin: "10px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.3s",
        boxShadow: initialShadow,
      }}
      onClick={() => {
        router.push(`/panel/generate/export?id=${item.id}`);
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = initialShadow;
      }}
    >
      <div
        style={{
          position: "absolute",
          right: 10,
          top: 10,
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          padding: "2px 5px",
          borderRadius: "5px",
        }}
      >
        <CalendarOutlined style={{ marginRight: 5 }} />
        <span style={{ fontSize: 12 }}>
          {item?.created_at ? formatDate(item?.created_at) : "Null"}
        </span>
      </div>

      <Card.Meta
        title={item?.rfp_name}
        style={{ fontSize: 20, marginTop: 10 }}
      />
      <p
        style={{
          fontSize: 16,
          marginTop: 10,
          marginBottom: 0,
          height: "100%",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
        }}
      >
        {item?.rfp_description}
      </p>
    </Card>
  );
} 