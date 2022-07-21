import { DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { queryListApi } from './api/listApi';
import { ListItem, ListParam } from './types/listType';

// 0 | 1 | 2 | 10; //0-下柜，1-上柜，2-下柜（可上柜），10-已删除
// 审核状态列表
const checkStatusList = {
  all: { text: '全部', status: 'Default' },
  0: {
    text: '下柜',
    status: 'Default',
  },
  1: {
    text: '上柜',
    status: 'Default',
  },
  2: {
    text: '下柜（可上柜）',
    status: 'Default',
  },
  10: {
    text: '已删除',
    status: 'Default',
  },
};

const columns: ProColumns<ListItem>[] = [
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
  },
  {
    title: '商品名称',
    dataIndex: 'skuName',
    align: 'center',
  },
  {
    title: '上下柜状态',
    dataIndex: 'checkStatus',
    ellipsis: true,
    valueType: 'select',
    valueEnum: checkStatusList,
    align: 'center',
    render: (text: number) => {
      return checkStatusList[text].text;
    },
  },
  {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    key: 'option',
    align: 'center',
    render: (text, record, _, action) => [
      <Button key="viewCheck" type="link" size="small">
        审核详情
      </Button>,
      <Button key="viewProduct" type="link" size="small">
        产品详情
      </Button>,
    ],
  },
];

/**
 * @description: 请求列表
 * @param {ListParam} params
 * @return {*}
 */
const queryList = async (params: ListParam) => {
  console.log(params, 'queryList----res---');
  const res = await queryListApi(params);
  return {
    data: [...res.list],
    total: res.total,
  };
};

const SkuCheckList = () => {
  return (
    <div className="sku-list">
      <ProTable
        columns={columns}
        options={false}
        pagination=\{{
          pageSizeOptions: [10, 20, 50],
        }}
        request={queryList}
        toolBarRender={() => [
          <Button key="out">
            导出数据
            <DownOutlined />
          </Button>,
        ]}
        rowKey="id"
      ></ProTable>
    </div>
  );
};

export default SkuCheckList;
