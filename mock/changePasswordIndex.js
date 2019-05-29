const qs = require('qs');
const Mock = require('mockjs');

const mockApiPrefix = '/development/api/v1';
module.exports = {
  [`POST ${mockApiPrefix}/employee/changePassword`] (req, res) {
    res.status(200).json({
      success: true,
      message: '密码修改成功',
      statusCode: 200,
      data: {},
    });
  },
  [`POST ${mockApiPrefix}/changePasswordTest`] (req, res) {
    res.status(200).json({
      success: false,
      message: '密码修改出现异常',
      statusCode: 400,
      data: {},
    });
  },
};
