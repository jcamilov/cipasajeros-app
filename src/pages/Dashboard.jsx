// 21.06 PENDIENTES
// Conflicto versiones. Recharts pide React 16 o menos y yo uso React 18. Esto no lo deja subir a netlify.
// Si no se corre local sino desde Firebase cloud, genera error de cors...
// Basicamente solo queda el tema estético. A parte si se quiere, agregar un par de funcionalidades:
// visualizar fraudes en la gráfica.

import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import Graph from "../components/Graph";
import Stats from "../components/Stats";
import DropdownVehiculos from "../components/DropdownVehiculos";
import TablaVehiculo from "../components/TablaVehiculo";
import {API_URL} from "../constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Dashboard() {
  const [historial, setHistorial] = useState({});
  const [listaVehiculos, setListaVehiculos] = useState([]);
  const [fechaConsulta, setFechaConsulta] = useState(1656979200);
  const [vehiculoConsulta, setVehiculoConsulta] = useState("WTN002");
  const [datosDia, setDatosDia] = useState({
    countEntradasAdelante: 0,
    countEntradasAtras: 0,
    countSalidas: 0,
    pasajerosEntranPorHora: [],
    pasajerosSalenPorHora: [],
  });
  const [noAutorizados, setNoAutorizados] = useState([]);
  const [verReporte, setVerReporte] = useState(false);

  const getVehiculos = async () => {
    const response = await fetch(API_URL + "/vehiculos", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const vehiculos = await response.json();
    setListaVehiculos([{id: "todos"}, ...vehiculos]);
  };

  const getPasajerosPorHora = async (fecha, id) => {
    const params = `fecha=${fecha}&id=${id}`;
    const response = await fetch(`${API_URL}/pasajeros/?${params}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    for (let i = 5; i < 23; i++) {
      if (
        res.pasajerosEntranPorHora.findIndex(
          (entrada) => entrada.hora === i
        ) === -1
      )
        res.pasajerosEntranPorHora.push({hora: i, pasajeros: 0});
      if (
        res.pasajerosSalenPorHora.findIndex((entrada) => entrada.hora === i) ===
        -1
      )
        res.pasajerosSalenPorHora.push({hora: i, pasajeros: 0});
    }
    setDatosDia(res);
  };

  const getFraudes = async (fecha, id) => {
    const params = `fecha=${fecha}&id=${id}`;
    const response = await fetch(`${API_URL}/noautorizados/?${params}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    setNoAutorizados(res);
  };

  const queryVehiculo = (vehiculoId) => {
    setVehiculoConsulta(vehiculoId);
    getPasajerosPorHora(fechaConsulta, vehiculoId);
  };

  const updateFecha = (date) => {
    date.setHours(0, 0, 0, 0);
    const d = new Date(0);
    d.setUTCSeconds(date / 1000);
    console.log(
      "Updating search date to: " + d.toLocaleDateString() + "(" + date + ")"
    );
    setFechaConsulta(date.getTime() / 1000);
  };

  const checkVerReporte = () => {
    if (!verReporte && !noAutorizados.length)
      getFraudes(fechaConsulta, vehiculoConsulta);
    setVerReporte(!verReporte);
  };

  useEffect(() => {
    getVehiculos();
    getPasajerosPorHora(fechaConsulta, vehiculoConsulta);
    getFraudes(fechaConsulta, vehiculoConsulta);
  }, [fechaConsulta, vehiculoConsulta]);

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-2 gap-4 mx-auto grid-rows-1 grid-flow-col place-content-center">
        <div className="container mx-auto text-xs text-slate-600">
          <div>seleccione fecha </div>
          <DatePicker
            portalId="root-portal"
            selected={new Date(fechaConsulta * 1000)}
            onSelect={(date) => updateFecha(date)}
            popperPlacement="bottom"
            className="mx-auto btn btn-outline text-center py-3 date-picker-reports "
          />
        </div>
        <div className="container mx-auto text-xs text-slate-600">
          <div>seleccione vehiculo </div>
          <DropdownVehiculos
            listaVehiculos={listaVehiculos}
            vehiculoActual={vehiculoConsulta}
            action={queryVehiculo}
          >
            Todos
          </DropdownVehiculos>
        </div>
      </div>
      <Stats data={datosDia} />
      <Graph data={datosDia} />
      <div className="form-control">
        <label className="label cursor-pointer w-32 mx-auto my-3">
          <span className="label-text">Ver reporte</span>
          <input
            type="checkbox"
            checked={verReporte}
            className="checkbox checkbox-primary"
            onChange={checkVerReporte}
          />
        </label>
      </div>
      {verReporte && <TablaVehiculo noAutorizados={noAutorizados} />}
    </div>
  );
}

export default Dashboard;
