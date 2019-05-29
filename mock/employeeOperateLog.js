const qs = require('qs');
const Mock = require('mockjs');

const mockApiPrefix = '/development/api/v1';

let list = [
  {
    id: 1,
    loginAccount: '13434271625',
    employeeName: '江山',
    loginType: '登录',
    fromSystem: 'E3',
    loginIp: '127.0.0.1',
    loginTime: '2017-12-01',
  },
  {
    id: 2,
    loginAccount: '13434271622',
    employeeName: '林国',
    loginType: '登出',
    fromSystem: 'OA',
    loginIp: '192.168.1.1',
    loginTime: '2017-12',
  },
  {
    id: 3,
    loginAccount: 'string',
    employeeName: 'string',
    loginType: 'string',
    fromSystem: 'string',
    loginIp: 'string',
    loginTime: '2017-12-1',
  },
  {
    id: 4,
    loginAccount: '13434271625',
    employeeName: '江山',
    loginType: '登录',
    fromSystem: 'E3',
    loginIp: '127.0.0.1',
    loginTime: '2017-12-01',
  },
  {
    id: 5,
    loginAccount: '13434271622',
    employeeName: '林国',
    loginType: '登出',
    fromSystem: 'OA',
    loginIp: '192.168.1.1',
    loginTime: '2017-12',
  },
  {
    id: 6,
    loginAccount: '13434271625',
    employeeName: '江山',
    loginType: '登录',
    fromSystem: 'E3',
    loginIp: '127.0.0.1',
    loginTime: '2017-12-01',
  },
  {
    id: 7,
    loginAccount: '13434271622',
    employeeName: '林国',
    loginType: '登出',
    fromSystem: 'OA',
    loginIp: '192.168.1.1',
    loginTime: '2017-12',
  },
  {
    id: 8,
    loginAccount: '13434271622',
    employeeName: '林国',
    loginType: '登出',
    fromSystem: 'OA',
    loginIp: '192.168.1.1',
    loginTime: '2017-12',
  },
  {
    id: 9,
    loginAccount: '13434271625',
    employeeName: '江山',
    loginType: '登录',
    fromSystem: 'E3',
    loginIp: '127.0.0.1',
    loginTime: '2017-12-01',
  },
  {
    id: 10,
    loginAccount: '13434271622',
    employeeName: '林国',
    loginType: '登出',
    fromSystem: 'OA',
    loginIp: '192.168.1.1',
    loginTime: '2017-12',
  },
  {
    id: 11,
    loginAccount: '13434271625',
    employeeName: '江山',
    loginType: '登录',
    fromSystem: 'E3',
    loginIp: '127.0.0.1',
    loginTime: '2017-12-01',
  },
  {
    id: 12,
    loginAccount: '13434271622',
    employeeName: '林国',
    loginType: '登出',
    fromSystem: 'OA',
    loginIp: '192.168.1.1',
    loginTime: '2017-12',
  },
];

let list2 = [
  {
    id: 1,
    loginAccount: '13434271625',
    employeeName: '江山',
    loginType: '登录',
    fromSystem: 'E3',
    loginIp: '127.0.0.1',
    loginTime: '2017-12-01',
  },
  {
    id: 2,
    loginAccount: '13434271622',
    employeeName: '林国',
    loginType: '登出',
    fromSystem: 'OA',
    loginIp: '192.168.1.1',
    loginTime: '2017-12',
  },
  {
    id: 3,
    loginAccount: 'string',
    employeeName: 'string',
    loginType: 'string',
    fromSystem: 'string',
    loginIp: 'string',
    loginTime: '2017-12-1',
  },
];

module.exports = {
  [`GET ${mockApiPrefix}/employeeOperateLog/list`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: {
        count: list2.length,
        results: list2,
      },
    });
  },
  [`GET ${mockApiPrefix}/employeeOperateLog/listTest`] (req, res) {
    res.status(200).json({
      success: false,
      message: 'ok',
      statusCode: 200,
      data: {
        count: list2.length,
        results: list2,
      },
    });
  },
};
