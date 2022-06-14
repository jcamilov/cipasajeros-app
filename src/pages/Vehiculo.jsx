import React from "react";

function Vehiculo() {
  return (
    <div className="container mx-auto">
      <h1>Reporte de fraudes</h1>
      <div className="overflow-x-auto">
        <table className="table w-full text-center">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Foto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>fecha1</td>
              <td>Hora1</td>
              <td>Foto1</td>
            </tr>
            <tr>
              <td>fecha1</td>
              <td>Hora1</td>
              <td>Foto1</td>
            </tr>
            <tr>
              <td>fecha1</td>
              <td>Hora1</td>
              <td>Foto1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Vehiculo;
