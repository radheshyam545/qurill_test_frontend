import React from "react";
import ReactEcharts from "echarts-for-react";
import { options } from "./lineChartOptions"

function App() {
  return (
    <ReactEcharts
      option={options}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default App;