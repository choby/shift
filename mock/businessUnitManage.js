const qs = require('qs');
const Mock = require('mockjs');

const mockApiPrefix = '/development/api/v1';

let data = {
  count: 18,
  results: [
    {
      id: 1,
      code: '00112',
      name: '广州汇美服装有限公司',
      validDate: 0,
      status: true,
      remark: '备注',
    },
    {
      id: 2,
      code: '010132',
      name: '广州汇美服装有限公司',
      validDate: 0,
      status: false,
      remark: '备注',
    },
    {
      id: 3,
      code: '02112',
      name: '广州汇美服装有限公司',
      validDate: 0,
      status: true,
      remark: '备注',
    },

  ],
};

const checkReq = (req) => {
  const { method, path } = req;
  console.log(`${method }:${path}`);
  if (method === 'POST' || method === 'PUT') {
    console.log(req.body);
  } else {
    console.log(req.query);
  }
  console.log('');
  console.log('----------------------------------------');
  console.log('');
};

module.exports = {
  [`GET ${mockApiPrefix}/businessUnit/list`] (req, res) {
    checkReq(req);
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data,
    });
  },
  [`PUT ${mockApiPrefix}/businessUnit/enable`] (req, res) {
    checkReq(req);
    res.status(200).json({
      success: true,
      message: '不知道怎么出错了',
      statusCode: 200,
    });
  },
  [`POST ${mockApiPrefix}/businessUnit/create`] (req, res) {
    checkReq(req);
    res.status(200).json({
      success: true,
      message: '创建成功',
      statusCode: 200,
    });
  },
  [`GET ${mockApiPrefix}/businessUnit/detail/:id`] (req, res) {
    checkReq(req);
    res.status(200).json({
      success: true,
      message: '',
      statusCode: 200,
      data: {
        id: 1,
        code: 'A1239',
        name: '生活在左',
        validDate: '2017-02-21',
        status: true,
        remark: '账套测试备注',
      },
    });
  },
  [`PUT ${mockApiPrefix}/businessUnit/edit`] (req, res) {
    checkReq(req);
    res.status(200).json({
      success: true,
      message: '编辑成功',
      statusCode: 200,
    });
  },
  [`GET ${mockApiPrefix}/businessUnitAdmin/list/:id`] (req, res) {
    checkReq(req);
    res.status(200).json({
      success: true,
      message: '编辑成功',
      statusCode: 200,
      data: {
        count: 12,
        results: [{
          id: 1,
          adminCode: 'v123',
          adminAccount: 'aaae3',
          adminName: '张三',
          businessUnit: '汇美',
          createTime: '2016-06-25',
          lastLoginTime: '2017-12-06',
          status: false,
        },
        {
          id: 2,
          adminCode: 'g12345',
          adminAccount: 'u86765',
          adminName: '李四',
          businessUnit: '初语',
          createTime: '2014-06-25',
          lastLoginTime: '2017-12-05',
          status: true,
        }],
      },
    });
  },
  [`PUT ${mockApiPrefix}/businessUnitAdmin/enable`] (req, res) {
    checkReq(req);
    res.status(200).json({
      success: true,
      message: '不知道怎么出错了',
      statusCode: 200,
    });
  },
  [`PUT ${mockApiPrefix}/businessUnitAdmin/resetPassword`] (req, res) {
    checkReq(req);
    res.status(200).json({
      success: true,
      message: '不知道怎么出错了',
      statusCode: 200,
      data: '123456789',
    });
  },
  [`POST ${mockApiPrefix}/businessUnitAdmin/create`] (req, res) {
    checkReq(req);
    res.status(200).json({
      success: true,
      message: '已经存在邮箱或手机号',
      statusCode: 603,
    });
  },
  [`GET ${mockApiPrefix}/businessUnit/list/byLoginedTanent/get`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'string',
      statusCode: 0,
      data: {
        results: [
          {
            id: 0,
            code: '1',
            name: '广州市汇美时尚集团账套',
            status: true,
            remark: 'string',
          },
          {
            id: 1,
            code: '2',
            name: '生活在左账套',
            status: true,
            remark: 'string',
          },
          {
            id: 3,
            code: '3',
            name: 'PASS账套',
            status: true,
            remark: 'string',
          },
          {
            id: 4,
            code: '4',
            name: '测试初语账套',
            status: true,
            remark: 'string',
          },
        ],
        count: 5,
      },
    });
  },
};
