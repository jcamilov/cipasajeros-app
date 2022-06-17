import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import Graph from "../components/Graph";
import Stats from "../components/Stats";
import DropdownVehiculos from "../components/DropdownVehiculos";
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

  const getHistorial = async () => {
    const response = await fetch(API_URL + "/vehiculos/todos", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const hist = await response.json();
    setHistorial(hist);
  };
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
    console.log(res);
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
    console.log(res);
    setDatosDia(res);
  };

  const queryVehiculo = (vehiculoId) => {
    setVehiculoConsulta(vehiculoId);
    getPasajerosPorHora(fechaConsulta, vehiculoId);
  };

  const updateFecha = (date) => {
    setFechaConsulta(date.getTime() / 1000);
  };

  useEffect(() => {
    getVehiculos();
    getPasajerosPorHora(fechaConsulta, "WTN002");
  }, [fechaConsulta]);

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
    </div>
  );
}

export default Dashboard;
