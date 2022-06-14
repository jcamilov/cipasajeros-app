import React from "react";
import banner from "../assets/banner.jpg";
import logo from "../assets/logo.png";

function Home() {
  const imageStyle = {};

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content align-text-top text-center text-neutral-content">
        <div className="max-w-md ">
          <img src={logo} alt="logo" className="mb-20 mx-auto" />
          <h1 className="mb-5 text-5xl font-bold">Bienvenido</h1>
          <p className="mb-5">
            Modulo de gestión de pasajeros y detección de fraude con IoT a
            Inteligencia Artifical. Proyecto financiado por el Miniterio de
            Ciencias de Colombia
          </p>
          <button className="btn btn-primary">iniciar</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
