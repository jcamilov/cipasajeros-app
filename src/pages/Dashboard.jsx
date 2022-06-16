import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import Graph from "../components/Graph";
import Stats from "../components/Stats";
import {API_URL} from "../constants";

// quedé en: halar el historial de vehiculos/todos, guardarlo en el state, luego pasarlo como prop
// al componente Graph y hacer lo mismo con el componente Stats.

function Dashboard() {
  const [historial, setHistorial] = useState({});
  const [listaVehiculos, setListaVehiculos] = useState([]);

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
    setListaVehiculos(vehiculos);
  };

  useEffect(() => {
    getVehiculos();
  }, []);

  return (
    <div>
      <Navbar />
      <Stats />
      <Graph />
    </div>
  );
}

export default Dashboard;
