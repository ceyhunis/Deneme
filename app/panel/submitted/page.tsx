"use client";

import Loader from "@/components/components/general/Loader";
import { useDrawer } from "@/lib/providers/DrawerContextProvider";
import { roleFieldMetaData, submiteedMetaData } from "@/types/admin_meta_types";
import { FormMetaType } from "@/types/general_types";
import { notify } from "@/utils/functions_utils";
import { DynamicRouter, postRequest } from "@/utils/request_utils";
import {
  Button,
  Divider,
  Drawer,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { ColumnType } from "antd/es/table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

import WrapperCRUDForm from "@/app/admin/(components)/WrapperCRUDForm";
import WrapperTable from "@/app/admin/(components)/WrapperTable";
import Papa from "papaparse";

export default function Submitted() {
  const [form] = useForm();
  const { isOpen, closeDrawer, openDrawer } = useDrawer();
  const [bulkAction, setBulkAction] = useState();
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const bulkURL = DynamicRouter("project", "bulk-actions");
  const { trigger } = useSWRMutation(bulkURL, postRequest);

  const fileURL = DynamicRouter("project", "save-with-multi-data");
  const { trigger: triggerFile } = useSWRMutation(fileURL, postRequest);
  const record = {
    id: params.get("id") ?? null,
  };
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const [loading, setLoading] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [previewedData, setPreviewedData] = useState<any>();
  const [functionalAreaParams, setFunctionalAreaParams] = useState(false);
  const [businessCycle, setBusinessCycle] = useState();

  useEffect(() => {
    if (pathname) {
      setSelectedRowKeys([]);
    }
  }, [pathname]);

  const pathRenderMap: {
    [key: string]: {
      url: string;
      title: string;
      key_word: string;
      metaData: FormMetaType[];
      columns: ColumnType<any>[];
    };
  } = {
    "/panel/submitted": {
      title: "Proposal Management",
      key_word: "Proposal",
      url: DynamicRouter("project", "proposal"),
      metaData: submiteedMetaData,
      columns: [
        {
          key: "id",
          dataIndex: "id",
          title: "ID",
          render: (text, record, index) => index + 1,
          width: 50,
        },

        { key: "recived_person", dataIndex: "recived_person", title: "Name" },
        {
          key: "recived_person_email",
          dataIndex: "recived_person_email",
          title: "Email",
        },
        { key: "status", dataIndex: "status", title: "Status" },
      ],
    },
  };

  const url = pathRenderMap[pathname ?? ""]?.url ?? null;
  const { data, error, isLoading, mutate: mutateTable } = useSWR(url);
  const { mutate, cache } = useSWRConfig();

  useEffect(() => {
    if (params.get("new") === `True` || params.get("edit") === "True") {
      openDrawer();
    } else {
      closeDrawer();
    }
  }, [params, openDrawer, closeDrawer]);

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnWidth: 60,
  };
  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        complete: function (results) {
          setPreviewedData(results.data);
          setOpenPreview(true);
        },
        header: true,
        skipEmptyLines: true,
      });
    }

    // Reset the value so the same file can be uploaded again if needed
    event.target.value = null;
  };
  const openFileDialog = () => {
    if (pathname !== "/admin/funtional-area") {
      // Create a hidden file input on the fly
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".csv";
      input.onchange = handleFileUpload;
      input.click(); // Open the file dialog
    } else {
      if (functionalAreaParams) {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".csv";
        input.onchange = handleFileUpload;
        input.click(); // Open the file dialog
      } else {
        setFunctionalAreaParams(true);
      }
    }
  };

  const title = () => (
    <Row
      style={{ margin: 0, padding: 0 }}
      justify={"space-between"}
      align={"middle"}
    >
      <Row align={"middle"}>
        {/* <Space>
          {selectedRowKeys.length > 0 && (
            <>
              <Select
                onChange={(value) => {
                  setBulkAction(value);
                }}
                style={{
                  minWidth: 200,
                }}
                options={[
                  {
                    value: "delete",
                    label: "Delete",
                  },
                ]}
              />

              <Button
                type="primary"
                style={{
                  backgroundColor: "#fab31b",
                }}
                onClick={() => {
                  setLoading(true);
                  const table = pathRenderMap[pathname].key_word
                    .toLowerCase()
                    .split(" ")
                    .join("_");

                  const values = {
                    action: bulkAction,
                    table: table,
                    ids: selectedRowKeys,
                  };

                  trigger(values, {
                    onSuccess: (response) => {
                      if (response.statusCode === 200) {
                        notify(response.message, "success");
                        mutateTable();
                        setLoading(false);
                      } else {
                        notify(response.message, "error");
                        setLoading(false);
                      }
                    },
                  });
                }}
              >
                Apply
              </Button>
            </>
          )}
          {![
            "/admin/user-management",
            "/admin/role-management",
            "/admin/questionnaire",
            "/admin/demo",
          ].includes(pathname) ? (
            <Button
              type="dashed"
              style={{ marginLeft: 10 }}
              onClick={openFileDialog}
            >
              CSV UPLOAD
            </Button>
          ) : (
            <></>
          )}
        </Space> */}
      </Row>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Input
          width={200}
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            marginRight: 10,
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            form.resetFields();
            router.push(`${pathname}?new=True`);
          }}
          style={{ marginRight: 10 }}
        >
          New {pathRenderMap[pathname ?? ""]?.key_word}
        </Button>
      </div>
    </Row>
  );

  const searchInData = (item: any) => {
    const fieldsToSearch = ["name", "description", "email", "role", "username"];
    return fieldsToSearch.some((field) => {
      if (item[field]) {
        return item[field].toString().toLowerCase().includes(searchQuery);
      }
      return false;
    });
  };

  //   const onRow = (record: any, rowIndex: any) => {
  //     return {
  //       onDoubleClick: (event: any) => {
  //         router.push(`${pathname}?edit=True&id=${record.id}`);
  //       },
  //     };
  //   };

  const filteredData = data?.data.filter((item: any) => searchInData(item));

  if (!pathRenderMap[pathname ?? ""]) {
    return <>404</>;
  }

  return (
    <Loader isLoading={loading}>
      <div style={{ padding: 20, marginLeft: 50 }}>
        <Row justify={"space-between"} align={"middle"}>
          <Typography.Text
            style={{
              padding: 0,
              fontWeight: 500,
              fontSize: "14px",
              color: "rgb(0,10,30)",
            }}
          >
            {pathRenderMap[pathname ?? ""]?.title} Table
          </Typography.Text>
        </Row>
        <Divider style={{ margin: "10px 0px" }} />
        <WrapperTable
          rowSelection={rowSelection}
          isLoading={isLoading}
          //   onRow={onRow}s
          data={data?.data || []}
          title={title}
          columns={pathRenderMap[pathname ?? ""]?.columns ?? []}
        />
        <Drawer
          title={
            record.id
              ? "Edit " + pathRenderMap[pathname ?? ""]?.key_word
              : "New " + pathRenderMap[pathname ?? ""]?.key_word
          }
          open={isOpen}
          onClose={() => {
            form.resetFields();
            router.push(`${pathname}`);
          }}
        >
          {isOpen && (
            <WrapperCRUDForm
              mutationURL={url ?? ""}
              metadata={pathRenderMap[pathname ?? ""]?.metaData}
              form={form}
              onFinish={(response: any) => {
                if (response.statusCode === 200) {
                  notify(response.message, "success");
                  form.resetFields();
                  router.push(`${pathname}`);
                } else {
                  notify(response.message, "error");
                }

                mutate(pathRenderMap[pathname]?.url);
              }}
              onDeleteFinished={(response: any) => {
                notify(response.message, "success");
                form.resetFields();
                router.push(`${pathname}`);
                mutate(pathRenderMap[pathname]?.url);
              }}
              onCancel={() => {
                form.resetFields();
                router.push(`${pathname}`);
              }}
              buttonText={
                record.id
                  ? `Update ${pathRenderMap[pathname ?? ""]?.key_word}`
                  : `Create ${pathRenderMap[pathname ?? ""]?.key_word}`
              }
            />
          )}
        </Drawer>

        <Modal
          width={800}
          style={{ width: 600 }}
          open={openPreview}
          onCancel={() => {
            setPreviewedData([]);
            setOpenPreview(false);
          }}
          onOk={() => {
            setLoading(true);
            const values = {
              data: previewedData,
              table: pathRenderMap[pathname]?.key_word
                .toLowerCase()
                .split(" ")
                .join("_"),
              business_cycle_id: businessCycle,
            };
            triggerFile(values, {
              onSuccess: (response) => {
                if (response.statusCode === 200) {
                  notify(response.message, "success");
                  setLoading(false);
                  setOpenPreview(false);
                  setPreviewedData([]);
                  setFunctionalAreaParams(false);
                  mutateTable();
                } else {
                  notify(response.message, "error");
                  setLoading(false);
                }
              },
            });
          }}
        >
          <Loader isLoading={loading}>
            {/* <Input type="file" onChange={changeHandler}></Input> */}
            <WrapperTable height={"600"} data={previewedData} />
          </Loader>
        </Modal>
      </div>
    </Loader>
  );
}
