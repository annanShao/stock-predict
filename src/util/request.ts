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

const request = createRequest(axiosInstance);

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