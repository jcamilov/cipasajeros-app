import React from "react";
import {data} from "../assets/fakedata";

function TestData() {
  const parsedData = [];
  for (let i = 0; i < 20; i++) {
    parsedData.push(
      new Date(Number.parseInt(data[i].registro) * 1000).toDateString()
    );
  }
  //   console.log("parsedData");
  //   console.log(parsedData);
  return <div>TestData</div>;
}

export default TestData;
