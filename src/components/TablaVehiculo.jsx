import React from "react";

function TablaVehiculo({noAutorizados}) {
  const parseTimeStamp = (timestamp) => {
    const day = new Date(timestamp * 1000).getDate();
    const month = new Date(timestamp * 1000).getMonth() + 1;
    const hora = new Date(timestamp * 1000).getUTCHours();
    const minutos = new Date(timestamp * 1000).getUTCMinutes();

    return `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }  -  ${hora < 10 ? "0" + hora : hora}:${
      minutos < 10 ? "0" + minutos : minutos
    }`;
  };
  return (
    <div>
      <div className="overflow-x-auto w-1/2 mx-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Vehículo</th>
              <th>Fecha/Hora</th>
              <th>Evidencia</th>
            </tr>
          </thead>
          <tbody>
            {noAutorizados.map((registro) => (
              <tr key={registro.timestamp}>
                <td>{registro.vehiculo}</td>
                <td>{parseTimeStamp(registro.timestamp)}</td>
                <td>
                  <a href={registro.urlFoto} target="_blank">
                    ver foto
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablaVehiculo;
