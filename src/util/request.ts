import { notification } from "antd";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'localhost:8888', // TODO only test domain
  timeout: 20000
})

export interface BaseResponse<T> {
  code: number;
  data: T;
  message: string;
}

const createRequest = (
  instance = axiosInstance,
  useCamelCase = false,
) => {
  return <T, U = BaseResponse<T>>(str: any, opt: any = {}): Promise<U> => {
    let options: any = Object.assign({}, opt);

    if (typeof str === 'string') {
      options.url = str;
    } else if (typeof str === 'object') {
      options = Object.assign(options, str);
    }

    if (
      `${options.method}`.toLowerCase() === 'get' ||
      options.method === undefined
    ) {
      options.params = options.body || options.data || options.params || {};
      if (useCamelCase) {
        options.params = _2CamelCase(options.params);
      }
      delete options.body;
      delete options.data;
    } else {
      // 其他方法
      options.data = options.body || options.data || {};
      if (useCamelCase) {
        options.data = _2CamelCase(options.data);
      }
      delete options.body;
    }

    if (options.responseType === 'text') {
      options.transformResponse = (data: string) => data;
    }

    options.baseURL = options.baseURL || options.domain || 'localhost:8888'

    return instance.request(options);
  };
};

addCommonInterceptors();
const request = createRequest(axiosInstance);

interface AnyObj {
  [x: string]: any;
}

function addCommonInterceptors(instance = axiosInstance) {
  instance.interceptors.response.use(
    (res: any) => {
      if (res?.data) {
        let resData = res.data;
        if (typeof resData === 'string') {
          resData = JSON.parse(resData);
        }

        if (
          resData.code === 0 ||
          resData.error_code === 0 ||
          resData.schemaStatus === 'ok' ||
          `${resData.status}`.toLowerCase() === 'success'
        ) {
          return res.config.responseType === 'text' ? res.data : resData;
        }

        if (res.config.noVerify) {
          return resData;
        }

        let content = '网络出错了，请重试'
        if (typeof resData.message === 'string') {
          content = resData.message;
        } else if (typeof resData.message === 'object') {
          content = JSON.stringify(resData.message);
        }

        if (!res.config || !res.config.hideError) {
          notification.error({
            message: '出错了',
            description: content,
          });
        }
        return resData;
      }
      return {};
    },
    (error) => Promise.reject(error),
  );
}

function _2CamelCase(obj: any): any {
  let target: any;
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    target = {};
    const keys = Object.keys(obj);
    if (keys.length > 0) {
      keys.forEach((key) => {
        const camelCaseKey = key.replace(/_(\w)/g, function (all, letter) {
          return letter.toUpperCase();
        });
        target[camelCaseKey] = _2CamelCase(obj[key]);
      });
    }
  } else if (Array.isArray(obj)) {
    target = [];
    obj.forEach((item) => {
      target.push(_2CamelCase(item));
    });
  } else {
    target = obj;
  }
  return target;
}


export default request;