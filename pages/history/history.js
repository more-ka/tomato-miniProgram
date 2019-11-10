import echarts from '../../components/ec-canvas/echarts';
const {http} = require('../../utils/http.js')

let todos = {}
let chart = null;
var category = [];
var barData = [];


function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
// Generate data

// option
var option = {
    backgroundColor: '#f2f2f2',
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    xAxis: {
        data: []
    },
    yAxis: {
        splitLine: {show: true},
        axisLine: {
            lineStyle: {
                color: '#000'
            }
        }
    },
    series: [ {
        name: '任务数',
        type: 'bar',
        barWidth: 10,
        itemStyle: {
            normal: {
                barBorderRadius: 2,
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: '#14c8d4'},
                        {offset: 1, color: '#43eec6'}
                    ]
                )
            }
        },
        data: []
    }]
};
  chart.setOption(option);
  return chart;
}

// http.get('/todos',{is_group:"yes"})
//     .then(response=>{
//       todos = response.data.resources
//       for (let key in todos) {
//         category.push(key);
//         barData.push(todos[key].length)
//     }
//     chart.setOption({
//       xAxis: {
//         data: category,
//         axisLine: {
//             lineStyle: {
//                 color: '#000'
//             }
//         }
//     },
//     dataZoom: [{
//       type: 'slider',
//       show: true,
//       xAxisIndex: [0],
//       left: '9%',
//       bottom: 10,
//       start: 50,
//       height: 30,
//       end: 100 //初始化滚动条
//   }],
//     series: [{
//       data: barData
//     }]
//     });
//   })



Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/history/history',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    todos: {},
    loginStatus: false,
    ec: {
      onInit: initChart
    }
  },
  onShow(){
    if (wx.getStorageSync('X-token')) {
      this.setData({
        loginStatus: true,
      })
    }
    category = []
    barData = []
    http.get('/todos',{is_group:"yes"})
    .then(response=>{
      todos = response.data.resources
      for (let key in todos) {
        category.push(key);
        barData.push(todos[key].length)
    }
    chart.setOption({
      xAxis: {
        data: category,
        axisLine: {
            lineStyle: {
                color: '#000'
            }
        }
    },
    dataZoom: [{
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      left: '9%',
      bottom: 10,
      start: 50,
      height: 30,
      end: 100 //初始化滚动条
  }],
    series: [{
      data: barData
    }]
    });
  })
  },
  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
    }, 0);
  }
});
// 图标有概率出现无数据问题,推测是