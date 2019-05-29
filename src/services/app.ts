import { request, config } from 'utils';

const { api,apiPrefix } = config;
const { user } = api;

export async function login (params) {
  return request({
    url: `${apiPrefix}/sso/login`,
    method: 'post',
    data: params,
  });
}

export async function logout (params) {
  return request({
    url: `${apiPrefix}/sso/logout`,
    method: 'post',
    data: params,
  });
}

export async function query (params) {
  return request({
    url: user.replace('/:id', ''),
    method: 'get',
    data: params,
  });
}

export async function fetchAccount() {
  return request({
    url: `${apiPrefix}/businessUnit/list/byLoginedTanent/get`,
    method: 'get'
  })
}