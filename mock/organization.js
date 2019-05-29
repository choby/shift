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

let list = [
  {
    id: 1,
    loginAccount: '13434271625',
    name: '供应链中心11',
    code: 'HM0001',
    parentOrganizationName: '广州市汇美服装有限公司',
    status: false,
  },
  
  {
    id: 2,
    loginAccount: '13434271625',
    name: '供应链中心22',
    code: 'HM0072',
    parentOrganizationName: '广州市汇美服装有限公司',
    status: true,
  },

  {
    id: 3,
    loginAccount: '13434271625',
    name: '供应链中心',
    code: 'HM0073',
    parentOrganizationName: '广州市汇美服装有限公司',
    status: true,
  },


  {
    id: 4,
    loginAccount: '13434271625',
    name: '供应链中心',
    code: 'HM007',
    parentOrganizationName: '广州市汇美服装有限公司',
    status: true,
  },

  {
    id: 5,
    loginAccount: '13434271625',
    name: '供应链中心',
    code: 'HM007',
    parentOrganizationName: '广州市汇美服装有限公司',
    status: true,
  },
  {
    id: 7,
    loginAccount: '13434271625',
    name: '供应链中心',
    code: 'HM007',
    parentOrganizationName: '广州市汇美服装有限公司',
    status: true,
  },
  
  {
    id: 8,
    loginAccount: '13434271625',
    name: '供应链中心',
    code: 'HM007',
    parentOrganizationName: '广州市汇美服装有限公司',
    status: true,
  },

  {
    id: 9,
    loginAccount: '13434271625',
    name: '供应链中心',
    code: 'HM007',
    parentOrganizationName: '广州市汇美服装有限公司',
    status: true,
  },

  {
    id: 10,
    loginAccount: '13434271625',
    name: '供应链中心',
    code: 'HM007',
    parentOrganizationName: '广州市汇美服装有限公司',
    status: true,
  },

  {
    id: 11,
    loginAccount: '13434271625',
    name: '供应链中心',
    code: 'HM007',
    parentOrganizationName: '广州市汇美服装有限公司',
    status: true,
  },

  {
    id: 12,
    loginAccount: '13434271625',
    name: '供应链中心',
    code: 'HM007',
    parentOrganizationName: '广州市汇美服装有限公司',
    status: false,
  },

  {
    id: 13,
    loginAccount: '13434271625',
    name: '供应链中心',
    code: 'HM007',
    parentOrganizationName: '广州市汇美服装有限公司',
    status: true,
  },

  {
    id: 100,
    loginAccount: '13434271625',
    name: '供应链中心',
    code: 'HM007',
    parentOrganizationName: '广州市汇美服装有限公司999',
    status: true,
  },

];

let detailTest = {
  id: 5,
  code: "HCM-007",
  name: "硬件部",
  parentOrganizationName: "信息部",
  parentOrganizationId: 0,
  principals: [{
    id: 1,
    code: "信息部",
    name: "张三",
  },{
    id: 2,
    code: "板房部",
    name: "李四",
  },],
  status: false,
  remark: "备注信息",
};


module.exports = {
  [`GET ${mockApiPrefix}/organization/list`] (req, res) {
    checkReq(req);
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: {
        count: list.length,
        results: list,
      },
    });
  },
  
  [`PUT ${mockApiPrefix}/organization/move`] (req, res) {
    checkReq(req);
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: {        
      },
    });
  },
  [`PUT ${mockApiPrefix}/organization/enable`] (req, res) {
    checkReq(req);
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: {        
      },
    });
  },

  [`POST ${mockApiPrefix}/organization/create`] (req, res) {
    checkReq(req);
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: {        
      },
    });
  },

   //明细
   [`GET ${mockApiPrefix}/organization/detail/:id`](req, res) {
    checkReq(req);
    res.status(200).json({
      success: true,
      message: '',
      statusCode: 200,
      data: detailTest,
    });
  },

  // 编辑
  [`PUT ${mockApiPrefix}/organization/edit`] (req, res) {
    checkReq(req);
    res.status(200).json({
      success: true,
      message: '编辑成功',
      statusCode: 200,
    });
  },

};
