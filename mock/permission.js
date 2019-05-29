const mockApiPrefix = '/development/api/v1';

const permissions = [
  {
    id: 1,
    name: '系统管理',
    children: [
      {
        id: 3,
        name: '组织架构',
        children: [
          {
            id: 6,
            name: '公司',
            children: [
              {
                id: 10,
                name: '查看',
              },
              {
                id: 11,
                name: '编辑',
              },
              {
                id: 12,
                name: '新增',
              },
            ],
          },
          {
            id: 7,
            name: '架构',
            children: [
              {
                id: 10,
                name: '查看',
              },
              {
                id: 11,
                name: '编辑',
              },
              {
                id: 12,
                name: '新增',
              },
            ],
          },
          {
            id: 8,
            name: '职位',
            children: [
              {
                id: 10,
                name: '查看',
              },
              {
                id: 11,
                name: '编辑',
              },
              {
                id: 12,
                name: '新增',
              },
            ],
          },
          {
            id: 9,
            name: '用户',
            children: [
              {
                id: 10,
                name: '查看',
              },
              {
                id: 11,
                name: '编辑',
              },
              {
                id: 12,
                name: '新增',
              },
            ],
          },
        ],
      },
      {
        id: 4,
        name: '权限管理',
        children: [
          {
            id: 13,
            name: '角色',
            children: [
              {
                id: 10,
                name: '查看',
              },
              {
                id: 11,
                name: '编辑',
              },
              {
                id: 12,
                name: '新增',
              },
            ],
          },
          {
            id: 14,
            name: '白名单',
            children: [
              {
                id: 10,
                name: '查看白名单',
              },
              {
                id: 11,
                name: '编辑',
              },
              {
                id: 12,
                name: '新增',
              },
            ],
          },
        ],
      },
      {
        id: 5,
        name: '配置管理',
        children: [
          {
            id: 15,
            name: '业务配置',
            children: [
              {
                id: 10,
                name: '查看',
              },
              {
                id: 11,
                name: '编辑',
              },
              {
                id: 12,
                name: '新增',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: '基础数据',
    children: [
      {
        id: 16,
        name: '仓库档案',
        children: [
          {
            id: 17,
            name: '品牌档案',
            children: [
              {
                id: 10,
                name: '查看',
              },
              {
                id: 11,
                name: '编辑',
              },
              {
                id: 12,
                name: '新增',
              },
            ],
          },
          {
            id: 18,
            name: '品类档案',
            children: [
              {
                id: 10,
                name: '查看',
              },
              {
                id: 11,
                name: '编辑',
              },
              {
                id: 12,
                name: '新增',
              },
            ],
          },
          {
            id: 19,
            name: '选项管理',
            children: [
              {
                id: 10,
                name: '查看',
              },
              {
                id: 11,
                name: '编辑',
              },
              {
                id: 12,
                name: '新增',
              },
            ],
          },
        ],
      },
    ],
  },
];


module.exports = {

  [`GET ${mockApiPrefix}/employee/resourceTree/get`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: permissions,
    });
  },

};
