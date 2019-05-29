const mockApiPrefix = '/development/api/v1';

let systems = [
  {
    id: 1,
    name: '供应链系统',
    code: 'SCM',
  },
  {
    id: 2,
    name: '订单管理系统',
    code: 'OMS',
  },
  {
    id: 3,
    name: '门店分销系统',
    code: 'SMS',
  },
];

module.exports = {
  [`GET ${mockApiPrefix}/system/list/get`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: {
        results: systems,
      },
    });
  },
};

