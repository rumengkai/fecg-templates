import { exportDataApi, queryPassListApi } from '@/service';
import { PassItem, PassListParam } from '@/service/types';
import { DownOutlined } from '@ant-design/icons';
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';


const List = () => {
  const formRef = useRef<ProFormInstance>();
  /**
   * @description: 请求列表
   * @param {ListParam} params
   * @return {*}
   */
  const queryList = async (params: PassListParam & { current: number }) => {
    console.log(params, 'queryList----res---');

    const res = await queryPassListApi({ ...params, pageNo: params.current });
    return {
      data: [...res.list],
      total: res.total,
    };
  };

  const columns: ProColumns<PassItem>[] = [
    {
      title: '产品UUID',
      dataIndex: 'uuid',
      align: 'center',
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      align: 'center',
    },
    {
      title: '产品型号',
      dataIndex: 'productModel',
      align: 'center',
    },
    {
      title: '产品sku',
      dataIndex: 'skuId',
      align: 'center',
    },
    {
      title: 'sku链接',
      dataIndex: 'skuUrl',
      align: 'center',
      search: false,
      width: 300,
      render: (_: any, record: PassItem) => {
        return (
          <Button type="link" href={record.skuUrl} target="_blank">
            {record.skuUrl}
          </Button>
        );
      },
    },
    {
      title: '商品名称',
      dataIndex: 'skuName',
      align: 'center',
    },
    {
      title: '上下柜状态',
      dataIndex: 'skuStatus',
      ellipsis: true,
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '全部',
            value: 999,
          },
          {
            label: '下柜',
            value: 0,
          },
          {
            label: '上柜',
            value: 1,
          },
          {
            label: '下柜（可上柜）',
            value: 2,
          },
          {
            label: '已删除',
            value: 10,
          },
        ],
      },
      align: 'center',
    },
  ];

  /**
   * @description: 导出excel
   * @return {*}
   */
  const handelExport = async () => {
    /** 去掉undefined的字段，小tips */
    const params = JSON.parse(JSON.stringify(formRef.current.getFieldsValue()));
    const res = await exportDataApi(params);
    const blobObj = new Blob([res], {
      type: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = window.URL.createObjectURL(blobObj as any); // 创建 URL 对象
    window.location.href = url;
  };

  return (
    <div className="list">
      <ProTable
        formRef={formRef}
        columns={columns}
        options={false}
        pagination={{
          pageSizeOptions: [10, 20, 50],
        }}
        request={queryList}
        toolBarRender={() => [
          <Button key="out" onClick={handelExport}>
            导出数据
            <DownOutlined />
          </Button>,
        ]}
        rowKey="skuId"
      ></ProTable>
    </div>
  );
};

export default import { exportDataApi, queryPassListApi } from '@/service';
import { PassItem, PassListParam } from '@/service/types';
import { DownOutlined } from '@ant-design/icons';
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';
// import { ExportExcel } from 'utils/tools';

// 0 | 1 | 2 | 10; //0-下柜，1-上柜，2-下柜（可上柜），10-已删除
// 审核状态列表
const checkStatusList = {
  999: { text: '全部' },
  0: {
    text: '下柜',
  },
  1: {
    text: '上柜',
  }
};

const List = () => {
  const formRef = useRef<ProFormInstance>();
  /**
   * @description: 请求列表
   * @param {ListParam} params
   * @return {*}
   */
  const queryList = async (params: PassListParam & { current: number }) => {
    console.log(params, 'queryList----res---');

    const res = await queryPassListApi({ ...params, pageNo: params.current });
    return {
      data: [...res.list],
      total: res.total,
    };
  };

  const columns: ProColumns<PassItem>[] = [
    {
      title: '产品UUID',
      dataIndex: 'uuid',
      align: 'center',
      search: false,
    },
    {
      title: '上下柜状态',
      dataIndex: 'skuStatus',
      ellipsis: true,
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '全部',
            value: 999,
          },
          {
            label: '下柜',
            value: 0,
          },
          {
            label: '上柜',
            value: 1,
          },
          {
            label: '下柜（可上柜）',
            value: 2,
          },
          {
            label: '已删除',
            value: 10,
          },
        ],
      },
      align: 'center',
      render: (_: any, record: PassItem) => {
        const { skuStatus } = record;
        return (!!skuStatus && checkStatusList[skuStatus].text) || '- -';
      },
    },
  ];

  /**
   * @description: 导出excel
   * @return {*}
   */
  const handelExport = async () => {
    /** 去掉undefined的字段，小tips */
    const params = JSON.parse(JSON.stringify(formRef.current.getFieldsValue()));
    const res = await exportDataApi(params);
    const blobObj = new Blob([res], {
      type: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = window.URL.createObjectURL(blobObj as any); // 创建 URL 对象
    window.location.href = url;
  };

  return (
    <div className="sku-list wrap">
      <ProTable
        formRef={formRef}
        columns={columns}
        options={false}
        pagination={{
          pageSizeOptions: [10, 20, 50],
        }}
        request={queryList}
        toolBarRender={() => [
          <Button key="out" onClick={handelExport}>
            导出数据
            <DownOutlined />
          </Button>,
        ]}
        rowKey="skuId"
      ></ProTable>
    </div>
  );
};

export default List;
;
