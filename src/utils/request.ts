/* global window */
import { message } from "antd";
import axios from "axios";
import jsonp from "jsonp";
import lodash from "lodash";
import pathToRegexp from "path-to-regexp";
import qs from "qs";
import config from "./config";
import { getAuthorization, setLogin } from "./cookies";
import { setLoginCookie, returnToSystem, goswitchUnit,goSwitchTenant, goChangePassword,goLogin } from "./sso"

const fetch: any = (options: any) => {
  let {
    method = "get",
    data,
    url,
    headers
  } = options;

  const cloneData: any = lodash.cloneDeep(data);
  if (!headers) {
    headers = {};
  }
  const authorization = getAuthorization();

  if (authorization) {
    headers["Authorization"] = authorization;
  }

  try {
    let domin: string = "";
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0];
      url = url.slice(domin.length);
    }
    const match = pathToRegexp.parse(url);
    url = pathToRegexp.compile(url)(data);
    for (let item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name];
      }
    }
    url = domin + url;
  } catch (e) {
    console.log('request.fetch delimiter(:) exception:', e.message);
    //message.error(e.message);
  }

  
  const withCredentials = true;// 允许跨域请求携带本站点cookie
  switch (method.toLowerCase()) {
    case "get":
      return axios.get(url, {
        params: cloneData,
        withCredentials,
        headers
      });
    case "delete":
      return axios.delete(url, {
        data: cloneData,
        withCredentials,
        headers
      });
    case "post":
      return axios.post(url, cloneData, {
        withCredentials,
        headers
      });
    case "put":
      return axios.put(url, cloneData, {
        withCredentials,
        headers
      });
    case "patch":
      return axios.patch(url, cloneData, {
        withCredentials,
        headers
      });
    default:
      return axios(options);
  }
};


//状态预处理
//处理服务端响应要求，比如重定向，无权限异常提示等
function preprocessingStatus(responseData: any): any {
  const data = responseData;
  switch (data.statusCode) {
    case 302: //http正常响应，服务端要求重定向
      location.href = data.data;
      return {};
    case 301: //http正常响应，服务端要求登陆
      goLogin();
      return {};

    case 332://登陆成功
      setLoginCookie(responseData);
      returnToSystem();
      return {};

    case 333://选择账套
      setLoginCookie(responseData);
      goswitchUnit();
      return {};

    case 334://修改初始密码
      setLoginCookie(responseData);
      goChangePassword();
      return {};

    case 335://选择租户
      setLoginCookie(responseData);
      goSwitchTenant();
      return {};

    case 401: //http正常响应，但是用户无权限访问接口
      message.error(data.message);
      return Promise.resolve({
        ...data
      });

    case -1: //http响应成功，但是服务器出现内部错误或服务器业务处理失败
      if(!responseData.success){
        message.error(responseData.message);
      }
      return Promise.resolve({
        ...data
      });
      
    case 1:  //http正常响应正常响应，并且业务操作正常
    default:
      return Promise.resolve({
        success: true,
        statusCode: status,
        ...data,
        message: data.success ?  (data.message ? data.message : "操作成功") : data.message,
      });;
  }

}

export default function request(options) {

  return fetch(options).then((response: any) => {
    const { statusText, status } = response;
    let data: any = response.data;
    if (data instanceof Array) {
      data = {
        list: data,
      };
    }
    return preprocessingStatus(data);;
  }).catch((error: any) => {
    const { response } = error;
    let msg: string;
    let statusCode: number;
    if (response && response instanceof Object) {
      const { data, statusText } = response;
      statusCode = response.status;
      msg = data.message || statusText;
    } else {
      statusCode = 600;
      msg = error.message || "Network Error";
    }
    return Promise.reject({ success: false, statusCode, message: msg });
  });
}
