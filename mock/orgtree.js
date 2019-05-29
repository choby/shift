const mockApiPrefix = '/development/api/v1';

let orgTree = {
  id: 1,
  name: '汇美账套',
  children: [
    {
      id: 2,
      name: '广州汇美服饰有限公司',
      children: [
        {
          id: 3,
          name: '信息中心',
          children: [
            {
              id: 4,
              name: '硬件网络组',
              children: [],
            },
            {
              id: 5,
              name: '系统运维组',
              children: [],
            },
            {
              id: 6,
              name: '软件研发组',
              children: [],
            },
            {
              id: 7,
              name: '硬件研发组',
              children: [],
            },
          ],
        },
        {
          id: 8,
          name: '人力资源中心',
          children: [
            {
              id: 9,
              name: '招聘组',
              children: [],
            },
            {
              id: 10,
              name: '薪资福利组',
              children: [],
            },
            {
              id: 11,
              name: '考勤组',
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 12,
      name: '广州初语服饰有限公司',
      children: [
        {
          id: 13,
          name: '客服中心',
          children: [
            {
              id: 14,
              name: '天猫客服组',
              children: [
              ],
            },
            {
              id: 15,
              name: '特卖客服组',
              children: [
              ],
            },
          ],
        },
        {
          id: 16,
          name: '设计中心',
          children: [
            {
              id: 17,
              name: '设计跟单组',
              children: [
              ],
            },
            {
              id: 18,
              name: '企划组',
              children: [
              ],
            },
          ],
        },
      ],
    },
  ],
};

let orgdata = [
  {
    id: 1,
    name: '广州汇美时尚集团有限公司',
    hasChildren: true,
    code: '001',
    businessUnit: '汇美公司',
    displayInOrganization: true,
    principalIds: [1],
    principals: [{ id: 1, name: '张三', code: '001' }],
    legalPerson: '张三',
    status: true,
    remark: '2008年成立',
  },
  {
    id: 2,
    name: '信息中心',
    hasChildren: true,
    code: '002',
    businessUnit: '汇美公司',
    displayInOrganization: true,
    principalIds: [2],
    principals: [{ id: 2, name: '李四', code: '002' }],
    legalPerson: '',
    status: true,
    remark: '信息中心，现有33人，主要。。。',
  },
  {
    id: 3,
    name: '人力资源中心',
    hasChildren: true,
    code: '003',
    businessUnit: '汇美公司',
    displayInOrganization: true,
    principalIds: [3],
    principals: [{ id: 3, name: '王五', code: '003' }],
    legalPerson: '',
    status: true,
    remark: '人力资源中心，现有10人，负责。。。',
  },
  {
    id: 4,
    name: '网络组',
    hasChildren: false,
    code: '004',
    businessUnit: '汇美公司',
    displayInOrganization: true,
    principalIds: [3],
    principals: [{ id: 3, name: '王五', code: '003' }],
    legalPerson: '',
    status: false,
    remark: '网络服务',
  },
  {
    id: 5,
    name: '系统组',
    hasChildren: false,
    code: '005',
    businessUnit: '汇美公司',
    displayInOrganization: false,
    principalIds: [3],
    principals: [{ id: 3, name: '王五', code: '003' }],
    legalPerson: '',
    status: true,
    remark: '系统运维',
  },
  {
    id: 6,
    name: '薪资福利组',
    hasChildren: false,
    code: '006',
    businessUnit: '汇美公司',
    displayInOrganization: true,
    principalIds: [4],
    principals: [{ id: 4, name: '阿六', code: '004' }],
    legalPerson: '',
    status: false,
    remark: '',
  },
  {
    id: 7,
    name: '招聘组',
    hasChildren: false,
    code: '007',
    businessUnit: '汇美公司',
    displayInOrganization: true,
    principalIds: [5],
    principals: [{ id: 5, name: '小七', code: '005' }],
    legalPerson: '',
    status: true,
    remark: '',
  },

];

module.exports = {

  // 加载所有结点
  [`GET ${mockApiPrefix}/organization/tree`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: orgTree,
    });
  },

 

  [`GET ${mockApiPrefix}/company/detail/:id`] (req, res) {
    //const { query } = req;
    const { id } = req.params;
    let datas = orgdata;
    let data = {};
    if (id) {
      datas = datas.filter((item) => {
        return item.id.toString() === id;
      });
      if (datas.length > 0 && datas)
        data = datas[0];
    }
    
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: data,
    });
  },

};

