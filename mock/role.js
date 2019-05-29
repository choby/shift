const qs = require('qs');
const Mock = require('mockjs');

const mockApiPrefix = '/development/api/v1';

const checkReq = (req) => {
  const { method, path } = req;
  console.log(method + ':' + path)
  if(method === 'POST' || method === 'PUT') {
    console.log(req.body)
  } else {
    console.log(req.query)
  }
  console.log('')
  console.log('----------------------------------------')
  console.log('')
}

let data = {
  count: 18,
  results: [
    {
      "id": 0,
      "code": "00112",
      "roleName": "跟单员",
      "status": true,
      "isShopManager": true,
      "shopName": "shop1",
      "description": "描述"
    }, {
      "id": 1,
      "code": "010132",
      "roleName": "采购员",
      "status": false,
      "isShopManager": true,
      "shopName": "shop2",
      "description": "描述"
    }, {
      "id": 2,
      "code": "02112",
      "roleName": "设计跟单",
      "status": true,
      "isShopManager": false,
      "shopName": "shop3",
      "description": "描述"
    }, 
  ],
};

let systems = [
  {
    "id": 0,
    "name": "OMS",
    "code": "1"
  }, {
    "id": 1,
    "name": "SCM",
    "code": "2"
  }, {
    "id": 2,
    "name": "ABC",
    "code": "3"
  }, 
];


module.exports = {
  [`GET ${mockApiPrefix}/system/list/get`](req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 1,
      data: {
        results: systems
      }
    });
  },
  [`GET ${mockApiPrefix}/role/pageList/get`](req, res) {
    checkReq(req);
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 1,
      data,
    });
  },
  [`GET ${mockApiPrefix}/role/list`](req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 1,
      data,
    });
  },
  [`POST ${mockApiPrefix}/role/add`](req, res) {
    checkReq(req);
    res.status(200).json({
      success: true,
      message: '不知道怎么出错了',
      statusCode: 200,
    });
  },
  [`GET ${mockApiPrefix}/role/get`](req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data:{
        id: 1,
        code: '02112',
        roleName: '设计跟单',
        status: true,
        description: '备注'
      },
    });
  },
  [`PUT ${mockApiPrefix}/role/update`](req, res) {
    res.status(200).json({
      success: true,
      message: '创建成功',
      statusCode: 200,
    });
  },
  [`DELETE ${mockApiPrefix}/role/delete`](req, res) {
    res.status(200).json({
      success: true,
      message: '',
      statusCode: 200,
      data: {}
    });
  },
  [`GET ${mockApiPrefix}/role/resourceTree/get`](req, res) {
    res.status(200).json({
      success: true,
      message: '',
      statusCode: 200,
      data: [
        {
          id: 1,
          name: '系统管理',
          children: [{
            id: 11,
            name: '组织架构',
            children: [{
              id: 1111,
              name: '查看'
            },
            {
              id: 11112,
              name: '添加'
            }]
          },
          {
            id: 12,
            name: '权限管理',
            children: [{
              id: 121,
              name: '公司',
              children: [{
                id: 1211,
                name: '查看'
              },
              {
                id: 12112,
                name: '添加'
              }]
            }]
          },
          ]
        }, {
          id: 2,
          name: '基础数据',
          children: [{
            id: 21,
            name: '组织架构',
            children: [{
              id: 211,
              name: '公司',
              children: [{
                id: 2111,
                name: '查看'
              },
              {
                id: 2112,
                name: '添加'
              }]
            }]
          },
          ]
        }]
    });
  },
  [`GET ${mockApiPrefix}/role/resourceList/get`](req, res) {
    res.status(200).json({
      success: true,
      message: '编辑成功',
      statusCode: 200,
      data: [11112, 12112, 2112]
    });
  },
  [`PUT ${mockApiPrefix}/role/resource/update`](req, res) {
    checkReq(req);
    res.status(200).json({
      success: true,
      message: '保存成功',
      statusCode: 200,
    });
  },
};
