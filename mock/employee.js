const mockApiPrefix = '/development/api/v1';

const employees = [
  {
    id: 1,
    code: '001',
    name: '张三',
    cellphone: '13500135000',
    email: 'zhangshan@163.com',
    organizationId: 1,
    organizationName: '广州汇美集团有限公司',
    isEnableLogin: true,
    status: true,
  },
  {
    id: 2,
    code: '002',
    name: '李四',
    cellphone: '13600136000',
    email: 'lisi@163.com',
    organizationId: 2,
    organizationName: '信息中心',
    isEnableLogin: true,
    status: true,
  },
  {
    id: 3,
    code: '003',
    name: '王五',
    cellphone: '13700137000',
    email: 'wangwu@163.com',
    organizationId: 3,
    organizationName: '人力资源中心',
    isEnableLogin: true,
    status: true,
  },
  {
    id: 4,
    code: '004',
    name: '赵六',
    cellphone: '13800138000',
    email: 'zhaoliu@163.com',
    organizationId: 4,
    organizationName: '网络组',
    isEnableLogin: true,
    status: true,
  },
  {
    id: 5,
    code: '005',
    name: '孙七',
    cellphone: '13900139000',
    email: 'sunqi@163.com',
    organizationId: 4,
    organizationName: '网络组',
    isEnableLogin: false,
    status: true,
  },
  {
    id: 6,
    code: '006',
    name: '周八',
    cellphone: '15100151000',
    email: 'zhouba@163.com',
    organizationId: 5,
    organizationName: '系统组',
    isEnableLogin: true,
    status: true,
  },
  {
    id: 7,
    code: '007',
    name: '吴九',
    cellphone: '15200152000',
    email: 'wujiu@163.com',
    organizationId: 6,
    organizationName: '招聘组',
    isEnableLogin: false,
    status: true,
  },
  {
    id: 8,
    code: '008',
    name: '刘一',
    cellphone: '15300153000',
    email: 'liuyi@163.com',
    organizationId: 7,
    organizationName: '薪资福利组',
    isEnableLogin: true,
    status: false,
  },
  {
    id: 9,
    code: '009',
    name: '陈二',
    cellphone: '15500155000',
    email: 'chener@163.com',
    organizationId: 7,
    organizationName: '薪资福利组',
    isEnableLogin: true,
    status: true,
  },
  {
    id: 10,
    code: '010',
    name: '张无忌',
    cellphone: '15500155000',
    email: 'zhangwuji@163.com',
    organizationId: 7,
    organizationName: '薪资福利组',
    isEnableLogin: true,
    status: true,
  },
  {
    id: 11,
    code: '011',
    name: '宋乔',
    cellphone: '15500155000',
    email: 'songqiao@163.com',
    organizationId: 4,
    organizationName: '网络组',
    isEnableLogin: true,
    status: true,
  },
];

let accounts = [
  {
    id: 1,
    account: '13800138000',
    type: '手机',
    status: true,
  },
  {
    id: 2,
    account: 'zhansan@163.com',
    type: '邮箱',
    status: false,
  },
];

let opLogs = [
  {
    id: 1,
    createdBy: '张三',
    createTime: '2018-01-09 10:00:00',
    editedBy: '张三',
    editTime: '2018-01-09 11:00:00',
  },
  {
    id: 2,
    createdBy: '李四',
    createTime: '2018-01-09 12:00:00',
    editedBy: '李四',
    editTime: '2018-01-09 13:00:00',
  },
];

const roles = [
  {
    id: 1,
    code: '001',
    roleName: '系统管理员',
    status: true,
    description: '系统管理员',
  },
  {
    id: 2,
    code: '002',
    roleName: '账套管理员',
    status: true,
    description: '账套管理员',
  },
  {
    id: 3,
    code: '003',
    roleName: '系统操作员',
    status: true,
    description: '系统操作员',
  },
  {
    id: 4,
    code: '004',
    roleName: '审核操作员',
    status: false,
    description: '审核操作员',
  },
  {
    id: 5,
    code: '005',
    roleName: '行政文员',
    status: false,
    description: '行政文员',
  },
  {
    id: 6,
    code: '006',
    roleName: '行政主管',
    status: false,
    description: '行政主管',
  },
  {
    id: 7,
    code: '007',
    roleName: '信息录入操作员',
    status: false,
    description: '信息录入操作员',
  },
  {
    id: 8,
    code: '008',
    roleName: '信息审核人',
    status: false,
    description: '信息审核人',
  },
];

module.exports = {

  // 已分配列表
  [`GET ${mockApiPrefix}/employee/assignedRoleList/get`] (req, res) {
    let results = roles.filter((item) => {
      return item.status;
    });
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: {
        results,
      },
    });
  },

  // 可分配角色列表
  [`GET ${mockApiPrefix}/employee/roleList/get`] (req, res) {
    const { query: { keyword } } = req;

    let datas = roles;
    if (keyword) {
      datas = datas.filter((item) => {
        return item.roleName.indexOf(keyword) >= 0;
      });
    }
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: {
        results: datas,
      },
    });
  },

  //确认提交
  [`POST ${mockApiPrefix}/employee/checkEmployeeInfo`] (req, res) {
    let statusCode = 1; //1-可以创建 2 邮箱存在，二次确认保存 3 手机存在，确认保存, 4 不能创建,
    res.status(200).json({
      success: true,
      message: '系统中存在相同的邮箱，手机号',
      statusCode: 2,
      data: {},
    });
  },

  // 创建
  [`POST ${mockApiPrefix}/employee/create`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 2,
      data: {},
    });
  },

  // 编辑
  [`PUT ${mockApiPrefix}/employee/edit`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
    });
  },

  // 列表
  [`GET ${mockApiPrefix}/employee/list`] (req, res) {
    const { organizationId, type, keyword } = req.query;
    let results = employees;
    if (organizationId) { 
      results = employees.map((item) => {
        if (organizationId === '1') {
          return item;
        }
        if (item.organizationId == organizationId) {
          return item;
        }
        if (organizationId === '2' && (item.organizationId === 4 || item.organizationId === 5)) {
          return item;
        }
        if (organizationId === '3' && (item.organizationId === 6 || item.organizationId === 7)) {
          return item;
        }
        return null;
      });       
      results = results.filter((item) => {
        return item != null;
      });
      //console.log(results);
    } else if (keyword && type) {
      //console.log(type, keyword);
      if (type === 'cellphone') {
        results = results.filter((item) => {
          return item.cellphone.indexOf(keyword) >= 0;
        });
      } else if (type === 'code') {
        results = results.filter((item) => {
          return item.code.indexOf(keyword) >= 0;
        });
      } else if (type === 'name') {
        results = results.filter((item) => {
          return item.name.indexOf(keyword) >= 0;
        });
      } else if (type === 'email') {
        results = results.filter((item) => {
          return item.email.indexOf(keyword) >= 0;
        });
      } else if (type === 'organizationName') {
        results = results.filter((item) => {
          return item.organizationName.indexOf(keyword) >= 0;
        });
      }
    }

    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data : {
        results
      },
    });  
  },

  [`GET ${mockApiPrefix}/employee/listByOrganization`] (req, res) {
    const { query } = req;
    let employeeList;

    let data;
    if (query) {
      const { organizationId, keyword } = query;
      data = employees;
      if (organizationId == 2) { // 信息中心
        data = data.filter((item) => {
          return (item.organizationId == 2 || item.organizationId == 4 || item.organizationId == 5)
        });
      } else if (organizationId == 3) { //人力资源
        data = data.filter((item) => {
          return (item.organizationId == 3 || item.organizationId == 6 || item.organizationId == 7)
        });
      } else if (organizationId != 1) { //网络
        data = data.filter((item) => {
          return (item.organizationId == organizationId);
        });
      }
      if (keyword) {
        data = data.filter((item) => {
          return item.name.indexOf(keyword) > -1;
        });
      }
    }
    if (data) {
      data = data.map((item) => {
        return { id: item.id, name: item.name, orgName: item.organizationName, code: item.code }
      });
    }

    // 按组织id 查询
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data,
    });
  },

  [`PUT ${mockApiPrefix}/employee/enableLogin`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: {},
    });
  },

  // 重置密码
  [`PUT ${mockApiPrefix}/employee/resetPassword`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: null,
    });
  },

  // 删除
  [`DELETE ${mockApiPrefix}/employee/delete`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: {},
    });
  },

  [`PUT ${mockApiPrefix}/employee/role/update`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: {},
    });
  },

  // 获取明细
  [`GET ${mockApiPrefix}/employee/detail/:id`] (req, res) {
    const { id } = req.params;
    //筛选
    let data = employees.find((item) => { return item.id == id; });
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data,
    });
  },

  // 账号列表
  [`GET ${mockApiPrefix}/employee/accountList/:id`] (req, res) {
    const { id } = req.params;
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: {
        results: accounts,
      },
    });
  },

  // 账号停用
  [`PUT ${mockApiPrefix}/employee/Account/enable`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: {},
    });
  },

 
   // 获取明细
   [`GET ${mockApiPrefix}/employee/logList`] (req, res) {
    //const { id } = req.params;
    //筛选
    
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data:{
        count:2,
        results:[
          {
            id: 1,
  loginAccount: "a223test",
  employeeName: "张三丰",
  loginType: "登陆",
  fromSystem: "OMS",
  loginIp: "127.0.0.1",
  loginTime: "1999-01-01"
          }
        ]
      },
    });
  },


};
