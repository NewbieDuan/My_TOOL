app.title = "极坐标系下的堆叠柱状图";

option = {
  // datasource:{
  // source: [
  //     ['时间', '周一', '周二', '周三', '周四'],
  //     ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
  //     ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
  //     ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
  // ]},
  angleAxis: [
    {
      show: false,
      polarIndex: 0
    },
    {
      show: false,
      polarIndex: 1
    }
  ],
  radiusAxis: [
    {
      show: true,
      axisLine: { show: false },
      axisTick: { show: false },
      data: ["", "", "周三", "周四"],
      z: 10,
      polarIndex: 0
    },
    {
      // axisLine:{show:false},
      // axisTick:{show:false},
      show: true,
      data: ["", "", "周三", "周四"],
      z: 10,
      polarIndex: 1
    }
  ],
  polar: [
    {
      radius: 200,
      center: ["30%", "50%"]
    },
    {
      radius: 200,
      center: ["70%", "50%"]
    }
  ],
  series: [
    {
      type: "bar",
      data: [, , 3, 4],
      coordinateSystem: "polar",
      polarIndex: 0
    },
    {
      type: "bar",
      data: [, , 3, 4],
      coordinateSystem: "polar",
      polarIndex: 1
    }
  ],
  legend: {
    show: true,
    data: ["", "", "周三", "周四"]
  }
};
