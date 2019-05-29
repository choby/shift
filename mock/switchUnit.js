const qs = require('qs');
const Mock = require('mockjs');
const mockApiPrefix = '/development/api/v1';

let database = [{id:1,name:"广州市汇美时尚集团账套"},{id:2,name:"测试初语账套"},{id:3,name:"测试魔范账套"},
{id:4,name:"生活在左账套"},{id:5,name:"PASS账套"}];
let database2 = [{id:1,name:"广州市汇美时尚集团账套"},];

module.exports = {
  [`GET ${mockApiPrefix}/sso/listBusinessUnit`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: database,
    });
  },
 
  [`POST ${mockApiPrefix}/sso/chooseBusinessUnit`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: database,
    });
  },



};
