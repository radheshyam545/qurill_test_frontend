// App.js
import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import { options, options1 } from "./chartOptions";

function App({ percentage }) {
  const formattedPercentage = isNaN(percentage) ? 0 : percentage;
  return (
    <span className="donut">

      <ReactEcharts

        option={options(formattedPercentage)}
        style={{ width: "100%", height: "100%" }}
      />
    </span>
  );
}

export default App;

// const options = {
//   grid: { top: 20, right: 40, bottom: 20, left: 40 },
//   xAxis: {
//     type: "category",
//     data: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]
//   },
//   yAxis: {
//     type: "value"
//   },
//   series: [
//     {
//       data: [400, 300, 350, 200, 280],
//       type: "bar",
//       smooth: true
//     }
//   ],
//   tooltip: {
//     trigger: "axis"
//   }
// }