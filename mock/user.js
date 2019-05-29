const qs = require('qs');
const Mock = require('mockjs');
const mockApiPrefix = '/development/api/v1';

let usersListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      name: '@name',
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      createTime: '@datetime',
      avatar () {
        return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.nickName.substr(0, 1));
      },
    },
  ],
});


let database = usersListData.data;

const EnumRoleType = {
  ADMIN: 'admin',
  DEFAULT: 'guest',
  DEVELOPER: 'developer',
};

const userPermission = {
  DEFAULT: {
    visit: ['1', '2', '21', '7', '5', '51', '52', '53'],
    role: EnumRoleType.DEFAULT,
  },
  ADMIN: {
    role: EnumRoleType.ADMIN,
  },
  DEVELOPER: {
    role: EnumRoleType.DEVELOPER,
  },
};

const adminUsers = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    permissions: userPermission.ADMIN,
  }, {
    id: 1,
    username: 'guest',
    password: 'guest',
    permissions: userPermission.DEFAULT,
  }, {
    id: 2,
    username: '吴彦祖',
    password: '123456',
    permissions: userPermission.DEVELOPER,
  },
];


const menus = [{
          "bpid": 0, 
          "icon": "zizhangtao", 
          "id": 5000, 
          "isNav": true, 
          "mpid": 0, 
          "name": "组织架构", 
          "route": ""
}, 
  {
    "bpid": 0,
    "icon": "zhangtao",
    "id": 6000,
    "isNav": true,
    "mpid": 0,
    "name": "账套管理",
    "route": "/businessunitmanage"
  }, 
  {
          "bpid": 5000, 
          // "icon": "laptop", 
          "id": 5001, 
          "isNav": true, 
          "mpid": 5000, 
          "name": "公司列表", 
          "route": "/company"
  }, 
  {
          "bpid": 5004, 
          // "icon": "laptop", 
          "id": 5005, 
          "isNav": true, 
          "mpid": 5004, 
          "name": "角色", 
          "route": "/role"
  }, 
  {
          "bpid": 5006, 
          // "icon": "laptop", 
          "id": 5007, 
          "isNav": true, 
          "mpid": 5006, 
          "name": "登录日志", 
          "route": "/employee/loginLog"
  }, 
  {
          "bpid": 5000, 
          // "icon": "laptop", 
          "id": 5002, 
          "isNav": true, 
          "mpid": 5000, 
          "name": "组织管理", 
          "route": "/employeeSystem/organization/list"
  }, 
  {
          "bpid": 0, 
          "icon": "kaiqi", 
          "id": 5004, 
          "isNav": true, 
          "mpid": 0, 
          "name": "权限管理", 
          "route": ""
  }, 
  {
          "bpid": 5000, 
          // "icon": "laptop", 
          "id": 5003, 
          "isNav": true, 
          "mpid": 5000, 
          "name": "员工管理", 
          "route": "/employee"
  }, 
  {
          "bpid": 0, 
          "icon": "xitongguanli", 
          "id": 5006, 
          "isNav": true, 
          "mpid": 0, 
          "name": "系统维护", 
          "route": ""
  }, 
  {
          "bpid": 5005, 
          // "icon": "laptop", 
          "id": 5046, 
          "isNav": false, 
          "mpid": 5005, 
          "name": "添加角色", 
          "route": "/role/create/:systemCode"
  }, 
  {
          "bpid": 5005, 
          // "icon": "laptop", 
          "id": 5047, 
          "isNav": false, 
          "mpid": 5005, 
          "name": "编辑角色", 
          "route": "/role/edit/:id"
  }, 
  {
          "bpid": 5001, 
          // "icon": "laptop", 
          "id": 5035, 
          "isNav": false, 
          "mpid": 5001, 
          "name": "编辑公司", 
          "route": "/company/edit/:id"
  }, 
  {
          "bpid": 5001, 
          // "icon": "laptop", 
          "id": 5036, 
          "isNav": false, 
          "mpid": 5001, 
          "name": "添加公司", 
          "route": "/company/create"
  }, 
  {
          "bpid": 5002, 
          // "icon": "laptop", 
          "id": 5038, 
          "isNav": false, 
          "mpid": 5002, 
          "name": "添加组织", 
          "route": "/employeeSystem/organization/create"
  }, 
  {
          "bpid": 5002, 
          // "icon": "laptop", 
          "id": 5039, 
          "isNav": false, 
          "mpid": 5002, 
          "name": "编辑组织", 
          "route": "/employeeSystem/organization/edit/:id"
  }, 
  {
          "bpid": 5003, 
          // "icon": "laptop", 
          "id": 5040, 
          "isNav": false, 
          "mpid": 5003, 
          "name": "员工详情", 
          "route": "/employee/detail/:id"
  }, 
  {
          "bpid": 5003, 
          // "icon": "laptop", 
          "id": 5041, 
          "isNav": false, 
          "mpid": 5003, 
          "name": "新增员工", 
          "route": "/employee/create"
  }, 
  {
          "bpid": 5003, 
          // "icon": "laptop", 
          "id": 5042, 
          "isNav": false, 
          "mpid": 5003, 
          "name": "编辑员工", 
          "route": "/employee/edit/:id"
  }, 
  {
          "bpid": 5003, 
          // "icon": "laptop", 
          "id": 5043, 
          "isNav": false, 
          "mpid": 5003, 
          "name": "员工权限", 
          "route": "/employee/permission/:id"
  }, 
  {
          "bpid": 5005, 
          // "icon": "laptop", 
          "id": 5044, 
          "isNav": false, 
          "mpid": 5005, 
          "name": "添加角色", 
          "route": "/role/create"
  }, 
  {
          "bpid": 5005, 
          // "icon": "laptop", 
          "id": 5045, 
          "isNav": false, 
          "mpid": 5005, 
          "name": "编辑角色", 
          "route": "/role/edit/:id"
  }
];


const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null;
  }
  let data;

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item;
      break;
    }
  }

  if (data) {
    return data;
  }
  return null;
};

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
};

module.exports = {

  [`POST ${mockApiPrefix}/sso/login`] (req, res) {
    const { username, password } = req.body;
    const user = adminUsers.filter(item => item.username === username);
    
    if (user.length > 0 && user[0].password === password) {
      const now = new Date();
      now.setDate(now.getDate() + 1);
      res.cookie('token', JSON.stringify({ id: user[0].id, deadline: now.getTime() }), {
        maxAge: 900000,
        httpOnly: true,
      });
      res.json({statusCode:333, success: true, message: 'Ok',data:{
        Authorization :"123"
      } });
    } else {
      res.status(400).end();
    }

    
  },

  [`POST ${mockApiPrefix}/sso/logout`] (req, res) {
    res.clearCookie('token');
    res.status(200).end();
  },

  [`GET ${mockApiPrefix}/user`] (req, res) {
    const cookie = req.headers.cookie || '';
    const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' });
    const response = {};
    const user = {};
    if (!cookies.token) {
      res.status(200).send({statusCode:301, message: 'Not Login' });
      return;
    }
    const token = JSON.parse(cookies.token);
    if (token) {
      response.success = token.deadline > new Date().getTime();
    }
    if (response.success) {
      const userItem = adminUsers.filter(_ => _.id === token.id);
      if (userItem.length > 0) {
        user.permissions = userItem[0].permissions;
        user.username = userItem[0].username;
        user.id = userItem[0].id;
      }
    }
   
    response.user = user;
    res.json(response);
  },

  [`GET ${mockApiPrefix}/employee/loginInfo/get`] (req, res) {
    const cookie = req.headers.cookie || '';
    const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' });
    const response = {
      success:true,
      message:null,
      statusCode:1,
      data:{}
    };
    const employeeInfo = {};
    if (!cookies.token) {
      res.status(200).send({statusCode:301,data:{}, message: 'Not Login' });
      return;
    }
    const token = JSON.parse(cookies.token);
    if (token) {
      response.success = token.deadline > new Date().getTime();
    }
    if (response.success) {
      const userItem = adminUsers.filter(_ => _.id === token.id);
      if (userItem.length > 0) {
        employeeInfo.businessUnitName = "汇美集团";
        employeeInfo.realName = userItem[0].username;
      }
    }
    response.data.menus =menus;
    response.data.employeeInfo = employeeInfo;
    response.data.permissionCodes = ["isGod"];
    
    res.json(response);
  },


  [`POST ${mockApiPrefix}/sso/isLogin`] (req, res) {
    
    const response = {
      success:false,
      message:null,
      statusCode:1,
      data:{}
    };    
    res.json(response);
  },

  [`DELETE ${mockApiPrefix}/users`] (req, res) {
    const { ids } = req.body;
    database = database.filter(item => !ids.some(_ => _ === item.id));
    res.status(204).end();
  },


  [`POST ${mockApiPrefix}/user`] (req, res) {
    const newData = req.body;
    newData.createTime = Mock.mock('@now');
    newData.avatar = newData.avatar || Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.nickName.substr(0, 1));
    newData.id = Mock.mock('@id');

    database.unshift(newData);

    res.status(200).end();
  },

  [`GET ${mockApiPrefix}/user/:id`] (req, res) {
    const { id } = req.params;
    const data = queryArray(database, id, 'id');
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json(NOTFOUND);
    }
  },

  [`DELETE ${mockApiPrefix}/user/:id`] (req, res) {
    const { id } = req.params;
    const data = queryArray(database, id, 'id');
    if (data) {
      database = database.filter(item => item.id !== id);
      res.status(204).end();
    } else {
      res.status(404).json(NOTFOUND);
    }
  },

  [`PATCH ${mockApiPrefix}/user/:id`] (req, res) {
    const { id } = req.params;
    const editItem = req.body;
    let isExist = false;

    database = database.map((item) => {
      if (item.id === id) {
        isExist = true;
        return Object.assign({}, item, editItem);
      }
      return item;
    });

    if (isExist) {
      res.status(201).end();
    } else {
      res.status(404).json(NOTFOUND);
    }
  },
  
};
