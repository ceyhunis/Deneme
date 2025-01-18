import React from "react";
import { Card, Popover } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

interface ProductCardProps {
  item: {
    id: number;
    rfp_name: string;
    rfp_description: string;
    created_at: string;
    services: number[];
    company_url: string;
    value_propositions: string;
  };
}

const getRandomColor = () => {
  const colors = ["#626dcf", "#2bbf5f", "#e5e5e5"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export default function ProductCard({ item }: ProductCardProps) {
  const router = useRouter();

  const formatDate = (dateString: string) =>
    dayjs(dateString).format("DD MMM YY");

  const initialShadow = "0 20px 20px rgba(0, 0, 0, 0.25)";

  return (
    <Popover
      content={
        <div>
          <p><strong>Title:</strong> {item.rfp_name}</p>
          <p><strong>Description:</strong> {item.rfp_description}</p>
          <p><strong>URL:</strong> {item.company_url}</p>
        </div>
      }
    >
      <Card
        hoverable
        style={{
          width: "100%",
          maxWidth: "400px",
          minWidth: "320px",
          height: "250px",
          margin: "10px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          transition: "box-shadow 0.3s, transform 0.3s",
          boxShadow: initialShadow,
          borderRadius: "10px",
          background: "#ffffff",
          overflow: "hidden",
        }}
        onClick={() => {
          router.push(`/panel/rfp/${item.id}`);
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
          e.currentTarget.style.transform = "translateY(-5px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = initialShadow;
          e.currentTarget.style.transform = "translateY(0)";
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
            zIndex: 2,
          }}
        >
          <CalendarOutlined style={{ marginRight: 5 }} />
          <span style={{ fontSize: 12 }}>{formatDate(item.created_at)}</span>
        </div>

        <div
          style={{
            flex: 1,
            overflow: "hidden",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <h3
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#333",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {truncateText(item.rfp_name, 30)}
            </h3>
          </div>

          <div
            style={{
              fontSize: 14,
              color: "#666",
              marginBottom: "10px",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {truncateText(item.rfp_description, 50)}
          </div>

          <div
            style={{
              fontSize: 14,
              color: "#666",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            <strong>URL:</strong> {truncateText(item.company_url, 30)}
          </div>
        </div>
      </Card>
    </Popover>
  );
}
