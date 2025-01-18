"use client";
import { Button, Col, Row, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import ProductCard from "../(components)/ProductCard";
import useSWR from "swr";
import { DynamicRouter } from "@/utils/request_utils";
import { ApiResponse } from "@/types/general_types";
import { useSession } from "next-auth/react";
import Title from "antd/es/typography/Title";
import { FilterOutlined } from "@ant-design/icons";

export default function PanelScreen() {
  const router = useRouter();
  const { data: session } = useSession();
  const url = DynamicRouter("project", "generated-rfp", {
    user_id: session?.user?.id,
  });
  const { data } = useSWR<ApiResponse<any>>(url);

  const dataSource = data?.data ?? [];

  if (!data) {
    return <Skeleton.Input active />;
  }

  return (
    <div style={{
      maxWidth: "1300px",
      margin: "0 auto",
    }}>
      {/* Header Row */}
      <Row
        justify="space-between"
        align="middle"
        style={{
          width: "100%",
          marginBottom: 20,
        }}
      >
        <Col>
          <Title
            level={3}
            style={{ color: "#121bda", fontSize: "22px" }}
          >
            Your RFPs
          </Title>
        </Col>
        <Col>
          <Button
            size="large"
            type="default"
            icon={<FilterOutlined />}
            style={{
              borderColor: "#626dcf",
              color: "#626dcf",
            }}
            onClick={() => {
              router.push("/panel/generate");
            }}
          >
            Generate RFP
          </Button>
        </Col>
      </Row>

      {/* Cards Grid */}
      <Row 
        gutter={[24, 24]} 
        style={{ 
          minHeight: "200px",
          width: "100%",
        }}
      >
        {dataSource.length > 0 ? (
          dataSource.map((item) => (
            <Col 
              key={item.id}
              xs={24}    
              sm={12}    
              lg={8}     
              style={{
                display: "flex",
                justifyContent: "center",
                minWidth: "340px", 
              }}
            >
              <div style={{
                width: "100%",
                maxWidth: "340px", 
              }}>
                <ProductCard item={item} />
              </div>
            </Col>
          ))
        ) : (
          <Col span={24} style={{ textAlign: "center", padding: "20px 0" }}>
            <p style={{
              fontSize: "24px",
              color: "#999eee",
              fontWeight: "600",
              margin: "0",
              padding: "20px",
              backgroundColor: "#f0f4ff",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              display: "inline-block",
              transition: "background-color 0.3s",
            }}>
              No RFP Data
            </p>
          </Col>
        )}
      </Row>
    </div>
  );
}
