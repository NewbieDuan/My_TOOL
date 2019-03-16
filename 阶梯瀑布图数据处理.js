var data = {
  燃油附加费对客运收入影响: -1300,
  "客公里收入(不含燃油附加费)对客运收入影响": 400,
  客座率对客运收入影响: -100,
  油价变化对成本影响: -200,
  腹舱收入变化: 1000,
  运力变化对成本影响: 600,
  "成本水平（不含油价）变化对成本影响": 200,
  运力变化对客运收入影响: -700
};
let map = _.map(data, (value, key) => {
  return {
    name: key,
    value
  };
});
let positive = [];
let negative = [];
let nameArr = [];
let addUp = [];
map.sort(function(a, b) {
  return b.value - a.value;
});
let sum = 0;
// map.unshift(this.profitAll[0]);
// map.push(this.profitAll[1]);
map.forEach(item => {
  let value = item.value;
  let isSame = sum * value >= 0;

  if (isSame) {
    addUp.push(sum);
    if (value >= 0) {
      positive.push(value);
      negative.push("-");
    } else {
      negative.push(value);
      positive.push("-");
    }
  } else {
    if (value >= 0) {
      if (sum + value > 0) {
        addUp.push(0);
        positive.push({
          value: value + sum,
          label: {
            formatter: function() {
              return Math.abs(value);
            }
          }
        });
        //处理穿轴
        negative.push({
          value: sum,
          itemStyle: { color: "#c23531" },
          label: {
            color: "transparent"
          }
        });
      } else {
        addUp.push(sum + value);
        positive.push(-value);
        negative.push("-");
      }
    } else {
      if (sum + value < 0) {
        //处理穿轴
        addUp.push(0);
        positive.push({
          value: sum,
          itemStyle: { color: "#2f4554" },
          label: {
            color: "transparent"
          }
        });

        negative.push({
          value: value + sum,
          label: {
            formatter: function() {
              return Math.abs(value);
            }
          }
        });
      } else {
        addUp.push(sum + value);
        negative.push(-value);
        positive.push("-");
      }
    }
  }
  sum += value;
  nameArr.push(item.name);
});
addUp[addUp.length - 1] = 0; //同期值无空白占位
_this.pieSaveData["profit"] = {
  nameArr,
  addUp,
  positive,
  negative
};
