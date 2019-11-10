import echarts from "../../components/ec-canvas/echarts.js";
const { http } = require("../../utils/http.js");

let todos = {};
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
    backgroundColor: "#f2f2f2",
    grid: {
      bottom: 120,
      left: 50
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    xAxis: {
      data: []
    },
    yAxis: {
      splitLine: { show: true },
      axisLine: {
        lineStyle: {
          color: "#000"
        }
      }
    },
    series: [
      {
        name: "任务数",
        type: "bar",
        barWidth: 10,
        itemStyle: {
          normal: {
            barBorderRadius: 2,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#14c8d4" },
              { offset: 1, color: "#43eec6" }
            ])
          }
        },
        data: []
      }
    ]
  };
  chart.setOption(option);
  return chart;
}

Page({
  data: {
    todos: {},
    loginStatus: false,
    ec: {
      onInit: initChart
    }
  },
  onShow() {
    category = [];
    barData = [];
    if (wx.getStorageSync("X-token")) {
      this.setData({
        loginStatus: true
      });
    }
    http.get("/todos", { is_group: "yes" }).then(response => {
      if (wx.getStorageSync("X-token")) {
        todos = response.data.resources;
        for (let key in todos) {
          category.push(key);
          barData.push(todos[key].length);
        }
      } else {
        category = [
          "1031",
          "1101",
          "1102",
          "1103",
          "1104",
          "1105",
          "1106",
          "1107",
          "1109",
          "1110"
        ];
        barData = [31,20,36, 45, 13, 38, 17, 28, 15, 25];
        wx.showToast({title: '未登录,展示模拟数据',icon: 'none'})
      }
      chart.setOption({
        xAxis: {
          data: category,
          axisLine: {
            lineStyle: {
              color: "#000"
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#000",
              fontSize: 20
            }
          }
        },
        yAxis: {
          splitLine: { show: true },
          axisLine: {
            lineStyle: {
              color: "#000"
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#000",
              fontSize: 20
            }
          }
        },
        dataZoom: [
          {
            type: "slider",
            show: true,
            xAxisIndex: [0],
            left: "12%",
            bottom: 30,
            start: 50,
            height: 40,
            end: 100 //初始化滚动条
          }
        ],
        series: [
          {
            data: barData,
            label: {
              normal: {
                fontSize: 14,
                rich: {}
              }
            }
          }
        ]
      });
    });
  }
});
