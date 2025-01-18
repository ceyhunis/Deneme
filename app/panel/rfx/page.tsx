"use client";

import React from "react";
import { Card, Button, Row, Col, Skeleton, Typography } from "antd";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import ProductCard from "../(components)/ProductCard";
import { DynamicRouter, fetcher } from "@/utils/request_utils";

const { Title } = Typography;

export default function RFXPage() {
  return (
    <div style={{ margin: "0 10px 0px 80px" }}>
      <RFXGenerator />
    </div>
  );
}

const RFXGenerator = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const url = DynamicRouter("project", "generated-rfp");
  const { data: response, error } = useSWR(url, fetcher);
  const dataSource = response?.data ?? [];

  if (error) return <div>Failed to load</div>;
  if (!response) {
    return (
      <div className="p-6">
        <Skeleton active />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1300px] mx-auto">
      {/* Header Row */}
      <Row justify="space-between" align="middle" className="w-full mb-5">
        <Col>
          <Title level={3} className="text-[#121bda] text-[22px] m-0">
            Your RFPs
          </Title>
        </Col>
        <Col>
          <Button
            size="large"
            className="border-[#626dcf] text-[#626dcf] flex items-center"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => router.push("/panel/generate")}
          >
            New RFP
          </Button>
        </Col>
      </Row>

      {/* Cards Grid */}
      <Row gutter={[16, 16]} className="min-h-[200px] w-full" justify="center">
        {dataSource.length > 0 ? (
          dataSource.map((item: any) => (
            <Col
              key={item.id}
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={6}
              className="flex justify-center"
              style={{ display: "flex", flexWrap: "wrap", maxWidth: "100%" }}
            >
              <ProductCard
                item={{
                  id: item.id,
                  rfp_name: item.rfp_name,
                  rfp_description: item.rfp_description,
                  created_at: item.created_at,
                  services: item.services || [],
                  company_url: item.company_url,
                  value_propositions: item.value_propositions,
                }}
              />
            </Col>
          ))
        ) : (
          <Col span={24} className="text-center py-5">
            <p className="text-2xl text-[#999eee] font-semibold m-0 p-5 bg-[#f0f4ff] rounded-lg shadow-md inline-block transition-colors">
              No RFP Data
            </p>
          </Col>
        )}
      </Row>
    </div>
  );
};
