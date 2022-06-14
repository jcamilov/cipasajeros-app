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
      <div className="stats shadow my-5">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">live</div>
          <div className="stat-value text-primary">1400</div>
          <div className="stat-desc">movilizados en tiempo real</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">no autorizados</div>
          <div className="stat-value text-secondary">13</div>
          <div className="stat-desc">Ingresos posible fraude</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">total movilizados</div>
          <div className="stat-value text-primary">1400</div>
          <div className="stat-desc">en el rango de fechas</div>
        </div>
      </div>
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
