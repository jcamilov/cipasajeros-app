import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  LabelList,
} from "recharts";
import {data} from "../assets/fakedata";

function Graph() {
  const datax = [
    {name: "Día 1", pasajeros: 400, fraude: 24, amt: 2400},
    {name: "Día 2", pasajeros: 300, fraude: 21, amt: 2400},
    {name: "Día 3", pasajeros: 700, fraude: 27, amt: 2400},
    {name: "Día 4", pasajeros: 420, fraude: 20, amt: 2400},
  ];

  const displayData = [];

  // levantarnos data fake para visualizar algo
  for (let i = 0; i < data.length; i++) {
    const day = new Date(Number.parseInt(data[i].registro) * 1000).getDate();
    const month =
      new Date(Number.parseInt(data[i].registro) * 1000).getMonth() + 1;
    const dayMonth = `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }`;

    // Si esta fecha no la tenemos, la agregamos al array
    let index = displayData.findIndex((el) => el.name === dayMonth);
    if (index === -1) {
      displayData.push({name: dayMonth, pasajeros: 0, fraude: 0});
      index = displayData.length - 1;
    }

    // incrementamos el conteo dentro del array dependiendo de si es fraude o pasajero legítimo
    if (data[i].sensor === "adelante" && data[i].tipoRegistro === "entradas") {
      displayData[index].pasajeros = displayData[index].pasajeros + 1;
    } else if (
      data[i].sensor === "atras" &&
      data[i].tipoRegistro === "entradas"
    ) {
      displayData[index].fraude = displayData[index].fraude + 1;
    }
  }

  const renderCustomizedLabel = (props) => {
    const {x, y, width, height, value} = props;
    const offset = -40;
    return (
      <text
        x={x - offset}
        y={y + offset * 0.1}
        fill="#285A64" // "#fff"}
        fontSize="11"
        fontWeight="bold"
        fontFamily="sans-serif"
        textAnchor="middle"
      >
        {value}
      </text>
    );
  };

  return (
    <div>
      <h1 className="font-semibold">Pasajeros movilizados</h1>
      <BarChart width={730} height={250} data={displayData} className="mx-auto">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        {/* <Tooltip /> */}
        <Legend />
        <Bar dataKey="pasajeros" fill="#8884d8" label={"pasajeros"}>
          <LabelList
            dataKey="pasajeros"
            content={renderCustomizedLabel}
            position="insideRight"
            style={{fill: "white"}}
          />
        </Bar>
        <Bar dataKey="fraude" fill="#82ca9d">
          <LabelList
            dataKey="fraude"
            content={renderCustomizedLabel}
            position="insideRight"
            style={{fill: "white"}}
          />
        </Bar>
      </BarChart>
    </div>
  );
}

export default Graph;
