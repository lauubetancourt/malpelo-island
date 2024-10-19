import React from "react";
import "./Home.css";
import NavBar from "../../components/navbar/NavBar";

const Home = () => {
  return (
    <>
      <NavBar />

      {/* Sección de bienvenida a la isla */}
      <section className="home-imagery">
        <img
          className="home-imagery_image"
          src="/images/malpelo.jpg"
          alt="Isla Malpelo"
        />
        <h2 className="home-imagery_welcome-text">Bienvenido a la</h2>
        <h1 className="home-imagery_island-text">Isla Malpelo</h1>
        <span className="home-imagery_location">
          <img
            className="home-imagery_location-icon"
            src="/images/location.png"
          />
        </span>
        <h2 className="home-imagery_location-text">
          Valle del Cauca, Colombia
        </h2>
      </section>
    </>
  );
};

export default Home;
