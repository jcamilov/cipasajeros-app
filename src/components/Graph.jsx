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

// POR HACER (OPCIONAL)
// Obtener ocupación por hora y graficarla como barra adicional.

function Graph({data}) {
  const {
    countEntradasAdelante,
    countEntradasAtras,
    countSalidas,
    pasajerosEntranPorHora,
    pasajerosSalenPorHora,
  } = {...data};

  // obtener ocupación por hora

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
      <BarChart
        width={730}
        height={250}
        data={pasajerosEntranPorHora}
        className="mx-auto"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hora" />
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
        {/* <Bar dataKey="fraude" fill="#82ca9d">
          <LabelList
            dataKey="fraude"
            content={renderCustomizedLabel}
            position="insideRight"
            style={{fill: "white"}}
          />
        </Bar> */}
      </BarChart>
    </div>
  );
}

export default Graph;
