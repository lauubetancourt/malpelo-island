import React from "react";
import "./Exploration.css";
import NavBar from "../../components/navbar/NavBar";
import Flora from "../../components/exploration/sectionFlora/Flora";
import Fauna from "../../components/exploration/sectionFauna/Fauna";
import Footer from "../../components/home/footer/Footer";

const Exploration = () => {
  return (
    <>
      <NavBar />
      <Flora />
      <Fauna />
      <Footer />
    </>
  );
};

export default Exploration;
