"use client";

import React, { useState, useMemo } from "react";
import useSWR from "swr";
import { Spin } from "antd";
import DashboardTopBar from "@/components/General/TopBar";
import OrganizationCard from "@/components/General/OrganizationCard";
import OrganizationTable from "@/components/General/OrganizationTable";
import Dashboard from "@/components/Organization/Dashboard";
import { DynamicRouter, fetcher } from "@/utils/request_utils";

interface Organization {
  id: number;
  name: string;
  domain: string;
  business_cycles: number[];
}

interface BusinessCycle {
  id: number;
  name: string;
}

export default function PanelScreen() {
  const [viewType, setViewType] = useState<"card" | "table">("card");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const {
    data: orgData,
    error: orgError,
    isLoading: orgLoading,
  } = useSWR(DynamicRouter("auth", "organization"), fetcher);

  const {
    data: bcData,
    error: bcError,
    isLoading: bcLoading,
  } = useSWR(DynamicRouter("project", "business-cycle"), fetcher);

  const businessCycleMap = useMemo(
    () =>
      bcData?.data?.reduce(
        (acc: Record<number, string>, cycle: BusinessCycle) => {
          acc[cycle.id] = cycle.name;
          return acc;
        },
        {}
      ) || {},
    [bcData]
  );

  const handleViewChange = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setViewType((prev) => (prev === "card" ? "table" : "card"));
      setIsTransitioning(false);
    }, 300);
  };

  if (orgLoading || bcLoading) return <Spin tip="Loading..." />;
  if (orgError || bcError) return <div>Error loading data</div>;

  const organizationData: Organization[] = orgData?.data || [];

  const gridStyles = {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 400px)",
    gap: "24px",
    justifyContent: "center",
  };

  const cardStyles = (index: number) => ({
    opacity: isTransitioning ? 0 : 1,
    transform: `scale(${isTransitioning ? 0.9 : 1})`,
    transition: `all 0.3s ease ${index * 0.1}s`,
  });

  return (
    <div style={{ margin: "0 0px 0px 70px" }}>
      <DashboardTopBar />
      <Dashboard setViewType={handleViewChange} viewType={viewType} />
      <div
        style={{
          position: "relative",
          padding: "0 24px 48px",
          marginTop: "16px",
          marginBottom: "24px",
          opacity: isTransitioning ? 0 : 1,
          transform: `translateY(${isTransitioning ? "20px" : "0"})`,
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {viewType === "card" ? (
          <div style={gridStyles}>
            {organizationData.map((org, index) => (
              <div key={org.id} style={cardStyles(index)}>
                <OrganizationCard
                  name={org.name}
                  domain={org.domain}
                  business_cycles={org.business_cycles}
                  businessCycleMap={businessCycleMap}
                />
              </div>
            ))}
          </div>
        ) : (
          <OrganizationTable />
        )}
      </div>
    </div>
  );
}
