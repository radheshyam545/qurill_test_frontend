// App.js
import React from "react";
import ReactEcharts from "echarts-for-react";
import { optionsFuncton } from "./chartOptions";

function MiniDoughnut({ color, doughnutData = { completedWeight: 0, totalWeight: 0 } }) {
  const { completedWeight, totalWeight } = doughnutData;
  return (
    <ReactEcharts
      option={optionsFuncton(color, totalWeight !== 0 ? (completedWeight / totalWeight) * 100 : 0, totalWeight, completedWeight)}
      color={color}
      style={{ width: "150px", height: "150px" }}
    />
  );
}

export default MiniDoughnut;
