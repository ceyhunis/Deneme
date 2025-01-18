import { Modal, Form, Radio, Input, Button, Table, Checkbox, Card, Space, Dropdown } from 'antd';
import { FilterOutlined, PlusOutlined, SelectOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import {  DynamicRouter } from '@/utils/request_utils';
import { notify } from '@/utils/functions_utils';
import Loader from '@/components/components/general/Loader';
import useSWR from 'swr';
import { useState, useMemo } from 'react';
import type { ColumnsType } from 'antd/es/table';
import type { FilterValue, TablePaginationConfig } from 'antd/es/table/interface';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import type { Key } from 'react';

interface ChooseCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: any) => Promise<void>;
  loading: boolean;
  rfpId: string | null;
  documentName?: string;
}

interface Provider {
  id: number;
  company_name: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  organization: number;
  organization_name: string;
  [key: string]: string | number;
}

interface ApiResponse {
  data: Provider[];
  message: string;
  status: string;
  statusCode: number;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

export default function ChooseCompanyModal({
  isOpen,
  onClose,
  onSubmit,
  loading,
  rfpId,
  documentName = ''
}: ChooseCompanyModalProps) {
  const { data: session } = useSession();
  const [selectedProviders, setSelectedProviders] = useState<Provider[]>([]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [searchText, setSearchText] = useState<Record<string, string>>({});
  
  // Provider'ları çekmek için doğru API endpoint'i
  const providersUrl = DynamicRouter("project", "provider");

  const { data: providersResponse, error, isLoading } = useSWR<ApiResponse>(
    providersUrl,
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
      shouldRetryOnError: false
    }
  );

  const providers = useMemo(() => {
    if (!providersResponse?.data) return [];
    return providersResponse.data;
  }, [providersResponse]);

  const getColumnSearchProps = (dataIndex: keyof Provider) => ({
    filterDropdown: (props: FilterDropdownProps) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={props.selectedKeys[0]}
          onChange={(e) => props.setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => props.confirm()}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => props.confirm()}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              props.clearFilters?.();
              props.confirm();
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value: Key | boolean, record: Provider) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase()),
  });

  const columns: ColumnsType<Provider> = [
    {
      title: 'Company',
      dataIndex: 'company_name',
      key: 'company_name',
      width: '25%',
      ellipsis: true,
      ...getColumnSearchProps('company_name'),
      render: (text: string) => (
        <div style={{ 
          padding: '0 8px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {text}
        </div>
      )
    },
    {
      title: 'Contact',
      dataIndex: 'contact_name',
      key: 'contact_name',
      width: '25%',
      ellipsis: true,
      ...getColumnSearchProps('contact_name'),
      render: (text: string) => (
        <div style={{ 
          padding: '0 8px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {text}
        </div>
      )
    },
    {
      title: 'Email',
      dataIndex: 'contact_email',
      key: 'contact_email',
      width: '25%',
      ellipsis: true,
      ...getColumnSearchProps('contact_email'),
      render: (text: string) => (
        <div style={{ 
          padding: '0 8px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {text}
        </div>
      )
    },
    {
      title: 'Organization',
      dataIndex: 'organization_name',
      key: 'organization_name',
      width: '25%',
      ellipsis: true,
      ...getColumnSearchProps('organization_name'),
      render: (text: string) => (
        <div style={{ 
          padding: '0 8px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {text}
        </div>
      )
    }
  ];

  const handleSubmit = async () => {
    if (selectedProviders.length === 0) {
      notify('Please select at least one provider', 'error');
      return;
    }

    try {
      // for (const provider of selectedProviders) {
      //   const emailResult = await sendEmail({
      //     name: provider.contact_name,
      //     email: provider.contact_email,
      //     to_email: provider.contact_email,
      //     link: `https://front-rfp-qjv43.ondigitalocean.app/access?id=${rfpId}`,
      //     subject: "Proposal",
      //   });

      //   if (emailResult.status === 200) {
      //     const submitValues = {
      //       rfp_id: rfpId,
      //       user_id: session?.user?.id,
      //       recived_person: provider.contact_name,
      //       recived_person_email: provider.contact_email,
      //     };
      //     await onSubmit(submitValues);
      //   }
      // }
      // setSelectedProviders([]);
    } catch (error) {
      notify('Error sending proposals', 'error');
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      width="80vw"
      style={{ 
        top: 40,
        maxWidth: '1200px',
        minWidth: '800px',
        marginLeft: 'calc(70px + ((100vw - 70px - 80vw) / 2))',
      }}
      bodyStyle={{ 
        padding: '24px',
        minHeight: '70vh',
        maxHeight: '80vh',
        overflow: 'hidden',
        borderRadius: '8px'
      }}
      className="custom-modal"
      modalRender={(node) => (
        <div className="modal-container">
          {node}
        </div>
      )}
      footer={[
        <Button 
          key="cancel" 
          onClick={onClose}
          size="large"
          style={{
            borderColor: '#626dcf',
            color: '#626dcf'
          }}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          disabled={selectedProviders.length === 0}
          loading={loading}
          size="large"
          style={{
            backgroundColor: '#626dcf',
            borderColor: '#626dcf'
          }}
        >
          Send Proposal
        </Button>,
      ]}
    >
      <Loader isLoading={isLoading}>
        {error && (
          <div 
            style={{ 
              color: '#ff4d4f',
              marginBottom: '16px',
              padding: '12px',
              background: 'rgba(255, 77, 79, 0.1)',
              borderRadius: '4px'
            }}
          >
            Error loading providers: {error?.message}
            {error?.response && (
              <div style={{ marginTop: '8px', fontSize: '12px' }}>
                Details: {JSON.stringify(error.response.data, null, 2)}
              </div>
            )}
          </div>
        )}
        
        <div style={{ 
          width: '100%',
          overflow: 'hidden'
        }}>
          <div className="header-container">
            <Space style={{ marginTop: '8px' }}>
              <Button
                icon={<FilterOutlined />}
                size="large"
                onClick={() => {
                  setSearchText({});
                  setTableParams({
                    ...tableParams,
                    filters: undefined,
                  });
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderColor: '#626dcf',
                  color: '#626dcf'
                }}
              >
                Clear Filters
              </Button>
              {selectedProviders.length > 0 && (
                <Button
                  type="link"
                  onClick={() => setSelectedProviders([])}
                  style={{
                    color: '#626dcf',
                    padding: '4px 8px',
                    height: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>{selectedProviders.length} provider(s) selected</span>
                  <span style={{ fontSize: '12px' }}>(click to clear)</span>
                </Button>
              )}
            </Space>

            <Card
              size="small"
              style={{
                width: '300px',
                backgroundColor: 'rgba(98, 109, 207, 0.05)',
                border: '1px solid #626dcf',
                borderRadius: '6px'
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <span style={{ 
                  color: '#626dcf',
                  fontSize: '12px',
                  fontWeight: 500
                }}>
                  Document Name
                </span>
                <span style={{
                  color: '#262626',
                  fontSize: '14px',
                  fontWeight: 500
                }}>
                  {documentName}
                </span>
              </div>
            </Card>
          </div>

          <div className="table-container">
            <Table
              dataSource={providers}
              columns={columns}
              rowKey="id"
              loading={{
                spinning: isLoading,
                tip: 'Loading providers...'
              }}
              onChange={(pagination, filters, sorter) => {
                setTableParams({
                  pagination,
                  filters: filters as Record<string, FilterValue>,
                  ...sorter,
                });
              }}
              pagination={{ 
                ...tableParams.pagination,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} providers`,
                pageSizeOptions: ['10', '20', '50']
              }}
              scroll={{ 
                y: 'calc(70vh - 250px)',
                x: '100%'
              }}
              size="middle"
              rowClassName={(record) => 
                selectedProviders.some(item => item.id === record.id) ? 'selected-row' : ''
              }
              rowSelection={{
                type: 'checkbox',
                selectedRowKeys: selectedProviders.map(item => item.id),
                onChange: (_, selectedRows) => {
                  setSelectedProviders(selectedRows);
                },
                columnWidth: 48,
                fixed: true
              }}
              onRow={(record) => ({
                onClick: () => {
                  // Eğer seçili ise kaldır, değilse ekle
                  if (selectedProviders.some(item => item.id === record.id)) {
                    setSelectedProviders(selectedProviders.filter(item => item.id !== record.id));
                  } else {
                    setSelectedProviders([...selectedProviders, record]);
                  }
                },
                style: { 
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }
              })}
              style={{
                width: '100%'
              }}
            />
          </div>

          <div style={{
            marginTop: '24px',
            display: 'flex',
            justifyContent: 'flex-start'
          }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#626dcf',
                borderColor: '#626dcf'
              }}
            >
              Custom Create
            </Button>
          </div>
        </div>
      </Loader>
    </Modal>
  );
} 