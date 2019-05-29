const qs = require('qs');
const Mock = require('mockjs');

const mockApiPrefix = '/development/api/v1';

let years = [{
  id: 1,
  text: 2017,
  value: 1,
},
{
  id: 2,
  text: 2018,
  value: 2,
},
{
  id: 3,
  text: 2019,
  value: 3,
}];


let seasons = [{
  id: 1,
  text: '春',
  value: '1',
},
{
  id: 2,
  text: '夏',
  value: '2',
},
{
  id: 3,
  text: '秋',
  value: '3',
},
{
  id: 4,
  text: '11.11',
  value: '4',
},
{
  id: 5,
  text: '冬',
  value: '5',
},
{
  id: 6,
  text: '12.12',
  value: '6',
}];

let developModes = [{
  id: 1,
  text: '内研款',
  value: '1',
},
{
  id: 2,
  text: '买手款',
  value: '2',
}];

let channels = [{
  id: 1,
  text: '线上',
  value: '1',
},
{
  id: 2,
  text: '线下',
  value: '2',
}];


module.exports = {
  [`GET ${mockApiPrefix}/base/options/year`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: years,
    });
  },
  [`GET ${mockApiPrefix}/base/options/season`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: seasons,
    });
  },
  [`GET ${mockApiPrefix}/base/options/developMode`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: developModes,
    });
  },
  [`GET ${mockApiPrefix}/base/options/channel`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: channels,
    });
  },
  [`GET ${mockApiPrefix}/base/options/waveband`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: [{
        id: 1,
        text: '双十一',
        value: '双十一',
      }, {
        id: 3,
        text: '春季',
        value: '春季',
      }, {
        id: 2,
        text: '618',
        value: '618',
      }],
    });
  },

  [`GET ${mockApiPrefix}/base/options/month`] (req, res) {
    res.status(200).json({
      success: true,
      message: 'ok',
      statusCode: 200,
      data: [{
        id: 1,
        text: '一月',
        value: '一月',
      }, {
        id: 2,
        text: '二月',
        value: '二月',
      }, {
        id: 3,
        text: '三月',
        value: '三月',
      },
      {
        id: 4,
        text: '四月',
        value: '四月',
      },
      {
        id: 5,
        text: '五月',
        value: '五月',
      },
      {
        id: 6,
        text: '六月',
        value: '六月',
      },
      {
        id: 7,
        text: '七月',
        value: '七月',
      },
      {
        id: 8,
        text: '八月',
        value: '八月',
      },
      {
        id: 9,
        text: '九月',
        value: '九月',
      },
      {
        id: 10,
        text: '十月',
        value: '十月',
      },
      {
        id: 11,
        text: '十一月',
        value: '十一月',
      },
      {
        id: 12,
        text: '十二月',
        value: '十二月',
      },

      ],
    });
  },

};

