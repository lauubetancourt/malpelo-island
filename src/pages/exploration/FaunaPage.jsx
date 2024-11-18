import React from "react";
import "./Exploration.css";
import NavBar from "../../components/navbar/NavBar";
import Fauna from "../../components/exploration/sectionFauna/Fauna";
import Footer from "../../components/home/footer/Footer";

const FaunaPage = () => {
  return (
    <>
      <NavBar />
      <Fauna />
      <Footer bgcolor={"#486ECA"} color={"white"} />
    </>
  );
};

export default FaunaPage;
