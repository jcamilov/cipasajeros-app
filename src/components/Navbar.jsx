import React from "react";
import iconoVsat from "../assets/icoVsat.ico";

function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <img src={iconoVsat} alt="icono Visualsat" />
      </div>
      <div className="flex-none">
        <a className="btn btn-ghost normal-case">Módulo CIPASAJEROS</a>
      </div>
    </div>
  );
}

export default Navbar;
