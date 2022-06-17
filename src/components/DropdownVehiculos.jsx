import React from "react";

function DropdownVehiculos({listaVehiculos, action, vehiculoActual}) {
  const closeDropdown = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div className="dropdown">
      <label tabIndex="0" className="btn btn-outline m-1 ">
        {vehiculoActual}
      </label>
      <ul
        tabIndex="0"
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {listaVehiculos.map((vehiculo) => (
          <li key={vehiculo.id}>
            <button
              className="btn btn-ghost"
              onClick={() => {
                action(vehiculo.id);
                closeDropdown();
              }}
            >
              {vehiculo.id}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DropdownVehiculos;
