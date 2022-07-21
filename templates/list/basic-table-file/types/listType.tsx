/*
 * @Author: 石丽丽
 * @description : 类型文件
 * @copyRight: 3C家电事业群
 */
import { PageVo } from 'typings/index';

// 查询参数
export type SearchParam = {
  uuid: string;
  productName: string;
  productModel: string;
  skuId: string;
  skuName: string;
  skuStatus: 0 | 1 | 2 | 10; //0-下柜，1-上柜，2-下柜（可上柜），10-已删除
};

// 列表项
export type ListItem = SearchParam & {
  skuUrl: string;
};

// 列表结构体
export type ListRespose = PageVo & {
  list: ListItem[];
};

// 列表请求
export type ListParam = SearchParam & PageVo;
