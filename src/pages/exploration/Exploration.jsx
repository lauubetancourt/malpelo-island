import React from "react";
import "./Exploration.css";
import NavBar from "../../components/navbar/NavBar";
import Flora from "../../components/exploration/sectionFlora/Flora";
import Fauna from "../../components/exploration/sectionFauna/Fauna";

const Exploration = () => {

  return (
    <>
    <NavBar/>
    <Flora/>
    <Fauna/>
    </>
  );
};

export default Exploration;