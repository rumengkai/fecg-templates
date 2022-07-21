import { Response } from 'typings/index';
import request from 'utils/request';
import { ListParam, ListRespose } from '../types/listType';
import { prefix } from './commonApi';

export const queryListApi = async (param: ListParam) => {
  return request<Response<ListRespose>>({
    url: `${prefix}/passList`,
    method: 'POST',
    data: param,
  });
};
