const qs = require('qs');
const Mock = require('mockjs');
const mockApiPrefix = '/development/api/v1';

module.exports = {
  [`GET ${mockApiPrefix}/tenant/list`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: {
        "results": [
          {
            "id": 0,
            "code": "string",
            "name": "string",
            "validDate": "2018-12-12",
            "status": false,
            "remark": "string"
          }
        ],
        "count": 0
      },
    });
  },
  [`POST ${mockApiPrefix}/tenant/create`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: {},
    });
  },
  [`PUT ${mockApiPrefix}/tenant/edit`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: {},
    });
  },

  [`GET ${mockApiPrefix}/tenantAdmin/list/:id`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: {
        "results": [
          {
            "id": 0,
            "adminCode": 0,
            "adminAccount": 0,
            "adminName": "string",
            "tenant": "string",
            "createTime": "string",
            "lastLoginTime": "string",
            "status": false
          }
        ],
        "count": 0
      },
    });
  },

  [`POST ${mockApiPrefix}/tenantAdmin/create`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 603,
      data: {},
    });
  },

  [`PUT ${mockApiPrefix}/tenantAdmin/enable`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: {},
    });
  },

  [`PUT ${mockApiPrefix}/tenantAdmin/resetPassword`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: {},
    });
  },

  [`GET ${mockApiPrefix}/tenant/detail/:id`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: {
        "id": 0,
        "code": "string",
        "name": "string",
        "validDate": "2018-12-12",
        "status": true,
        "remark": "string"
      },
    });
  },
};