// App.js
import React from "react";
import ReactEcharts from "echarts-for-react";
import { optionsFuncton } from "./chartOptions";

function MiniDoughnut({value=0}) {
  
  return (
    <ReactEcharts
      option={optionsFuncton(value)}
      color={"#2E2D46"}
      style={{ width: "60px", height: "60px",  }}
    />
  );
}

export default MiniDoughnut;
