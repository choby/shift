const mockApiPrefix = '/development/api/v1';

let personDatas = [
  {
    id: 1,
    code: '001',
    name: '张三',
    orgName: '硬件网络组',
  },
  {
    id: 2,
    code: '006',
    name: '老九',
    orgName: '硬件网络组',
  },
  {
    id: 3,
    code: '003',
    name: '王五',
    orgName: '系统运维组',
  },
  {
    id: 4,
    code: '004',
    name: '刘一',
    orgName: '软件研发组',
  },
  {
    id: 5,
    code: '005',
    name: '陈二',
    orgName: '硬件研发组',
  },
  {
    id: 6,
    code: '006',
    name: '阿六',
    orgName: '招聘组',
  },
  {
    id: 7,
    code: '007',
    name: '小七',
    orgName: '招聘组',
  },
  {
    id: 8,
    code: '008',
    name: '陆逊',
    orgName: '薪资福利组',
  },
  {
    id: 9,
    code: '009',
    name: '严守一',
    orgName: '考勤组',
  },
  {
    id: 10,
    code: '010',
    name: '小发',
    orgName: '天猫客服组',
  },
  {
    id: 11,
    code: '011',
    name: '小招',
    orgName: '天猫客服组',
  },
  {
    id: 12,
    code: '012',
    name: '小远',
    orgName: '特卖客服组',
  },
  {
    id: 13,
    code: '013',
    name: '汤镇业',
    orgName: '设计跟单组',
  },
  {
    id: 14,
    code: '014',
    name: '曹查理',
    orgName: '企划组',
  },
];

module.exports = {
  [`GET ${mockApiPrefix}/employee/listByOrganization`] (req, res) {
    const { query } = req;
    const { organizationId, keyword } = query;

    let data = personDatas;
    if (organizationId == 2) { // 汇美
      data = data.slice(0,9);
    } else if (organizationId == 3) { // 信息中心
      data = data.slice(0, 5);
    } else if (organizationId == 4) { // 硬网
      data = data.slice(0, 2);
    } else if (organizationId == 5) { // 系运
      data = data.slice(2, 3);
    } else if (organizationId == 6) { // 软件
      data = data.slice(3, 4);
    } else if (organizationId == 7) { // 硬件
      data = data.slice(4, 5);
    } else if (organizationId == 8) { // 人力资源中心
      data = data.slice(5, 9);
    } else if (organizationId == 9) { // 招聘组
      data = data.slice(5, 7);
    } else if (organizationId == 10) { // 薪资福利组
      data = data.slice(7, 8);
    } else if (organizationId == 11) { // 考勤组
      data = data.slice(8, 9);
    } else if ( organizationId == 12) { // 初语公司
      data = data.slice(9, 14);
    } else if ( organizationId == 13) { // 客服中心
      data = data.slice(9, 12);
    } else if ( organizationId == 14) { // 天猫
      data = data.slice(9, 11);
    } else if ( organizationId == 15) { // 特卖
      data = data.slice(11, 12);
    } else if ( organizationId == 16) { // 设计中心
      data = data.slice(12, 14);
    } else if ( organizationId == 17) { // 跟单
      data = data.slice(12, 13);
    } else if ( organizationId == 18) { // 企划
      data = data.slice(13, 14);
    }

    if (keyword) {
      data = data.filter((item) => {
        return item.name.indexOf(keyword) > -1;
      });
    }

    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: { count:data.length , results:data} 
    });
  },
};

