import fetch from 'dva/fetch';
import { notification, message } from 'antd';
import { stringify } from 'qs';
// import { routerRedux } from 'dva/router';
// import store from '../index';
import { goLogin } from "./sso";
import { getAuthorization } from "./cookies";
import config from './config';

const codemessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codemessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error["response"] = response;
  throw error;
}


//状态预处理
//处理服务端响应要求，比如重定向，无权限异常提示等
function preprocessingStatus(response) {
  switch (response.statusCode) {
    case 302: //http正常响应，服务端要求重定向
      location.href = response.data;
      return {};
    case 301: //http正常响应，服务端要求登陆
      goLogin(response.data);
      return {};

    // case 332://登陆成功
    //   setLoginCookie(responseData);
    //   returnToSystem();
    //   return {};

    // case 333://选择账套
    //   setLoginCookie(responseData);
    //   goSwithcUnit();
    //   return {};

    // case 334://修改初始密码
    //   setLoginCookie(responseData);
    //   goChangePassword();
    //   return {};

    case 401: //http正常响应，无权限
      message.error(response.message);
      return Promise.resolve({
        ...response
      });

    case 402: //http正常响应，但是用户当前系统当前帐套无访问权限
      message.error(response.message);
      return Promise.resolve({
        ...response
      });

    case -1: //http响应成功，但是服务器出现内部错误或服务器业务处理失败
      if (response.success === false) {
        message.error(response.message);
      }
      return Promise.resolve({
        ...response
      });

    case 1:  //http正常响应正常响应，并且业务操作正常
    default:
      return Promise.resolve({
        success: true,
        statusCode: status,
        ...response,
        message: response.success ? (!response.message ? "操作成功" : response.message) : response.message,
      });
  }

}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  if(!options){
    options = {query:{}};
  }
  else if (!options.query) {
    options.query = {};
  }
  // options.query["frontCode"] = config.fontCode;
  try {
    let domin = "";
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0];
      url = url.slice(domin.length);
    }
    url = `${url}?${stringify(options.query)}`;
    url = domin + url;
  } catch (e) {
    console.log('request.fetch delimiter(:) exception:', e.message);
  }


  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };

  if (!(newOptions.body instanceof FormData)) {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  } else {
    // newOptions.body is FormData
    newOptions.headers = {
      Accept: 'application/json',
      ...newOptions.headers,
    };
  }


  const authorization = getAuthorization();

  if (authorization) {
    newOptions.headers[config.identityHeaderKey] = authorization;
  }

  return fetch(url, newOptions)
    .then(checkStatus)

    .then(response => {
      // if (newOptions.method === 'DELETE' || response.status === 204) {
      //   return response.text();
      // }
      return response.json();
    })
    .then(preprocessingStatus)
    .catch(e => {
    //   const { dispatch } = store;
    //   const status = e.name;
    //   if (status === 401) {
    //     dispatch({
    //       type: 'login/logout',
    //     });
    //     return;
    //   }
    //   if (status === 403) {
    //     dispatch(routerRedux.push('/exception/403'));
    //     return;
    //   }
    //   if (status <= 504 && status >= 500) {
    //     dispatch(routerRedux.push('/exception/500'));
    //     return;
    //   }
    //   if (status >= 404 && status < 422) {
    //     dispatch(routerRedux.push('/exception/404'));
    //   }
    });
}
