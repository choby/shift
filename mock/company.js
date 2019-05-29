const mockApiPrefix = '/development/api/v1';

const companies = [
  {
    id: 1,
    code: 'HM001',
    name: '广州汇美集团有限公司',
    businessUnitName: '汇美账套',
    displayInOrganization: true,
    status: true,
    remark: '',
  },
  {
    id: 2,
    code: 'HM002',
    name: '初语服饰有限公司',
    businessUnitName: '初语账套',
    displayInOrganization: true,
    status: true,
    remark: '',
  },
  {
    id: 3,
    code: 'HM003',
    name: '秋壳服饰有限公司',
    businessUnitName: '秋壳账套',

    displayInOrganization: true,
    status: true,
    remark: '',
  },
  {
    id: 4,
    code: 'HM004',
    name: '魔范服饰有限公司',
    businessUnitName: '魔范账套',

    displayInOrganization: true,
    status: true,
    remark: '',
  },
  {
    id: 5,
    code: 'HM005',
    name: '茵曼女装有限公司',
    businessUnitName: '茵曼账套',

    displayInOrganization: true,
    status: true,
    remark: '',
  },
  {
    id: 6,
    code: 'HM006',
    name: '茵曼童装有限公司',
    businessUnitName: '茵曼童装',

    displayInOrganization: true,
    status: true,
    remark: '',
  },
  {
    id: 7,
    code: 'HM007',
    name: '茵曼家居有限公司',
    businessUnitName: '茵曼家居',

    displayInOrganization: true,
    status: true,
    remark: '',
  },
  {
    id: 8,
    code: 'HM008',
    name: '生活在左服饰有限公司',
    businessUnitName: '生活在左',

    displayInOrganization: true,
    status: true,
    remark: '',
  },
  {
    id: 9,
    code: 'HM009',
    name: 'SAY服饰有限公司',
    businessUnitName: 'SAY账套',

    displayInOrganization: true,
    status: true,
    remark: '',
  },
  {
    id: 10,
    code: 'HM010',
    name: '茵曼鞋包有限公司',
    businessUnitName: '茵曼鞋包',

    displayInOrganization: true,
    status: true,
    remark: '',
  },
  {
    id: 11,
    code: 'HM011',
    name: 'AKS服饰有限公司',
    businessUnitName: 'AKS账套',
 
    displayInOrganization: true,
    status: true,
    remark: '',
  },
  
];

module.exports = {

  [`GET ${mockApiPrefix}/company/list`] (req, res) {
    const { query } = req;
    let { code, name, status } = query; // 代码，名称，状态，当前页，页大小记录数
    let datas = companies;
    if (code) {
      datas = datas.filter((item) => {
        return item.code.indexOf(code) > -1;
      });
    }
    if (name) {
      datas = datas.filter((item) => {
        return item.name.indexOf(name) > -1;
      });
    }

    if (status !== undefined) {
      datas = datas.filter((item) => {
        return item.status.toString() === status;
      });
    }

    let result = { results: datas, count: datas.length };

    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: result,
    });
  },

  [`POST ${mockApiPrefix}/company/create`] (req, res) {
    //console.log(...req);
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
    });
  },

  [`PUT ${mockApiPrefix}/company/edit`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
    });
  },


  [`PUT ${mockApiPrefix}/company/enable`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
    });
  },

  [`PUT ${mockApiPrefix}/company/display`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
    });
  },

};
