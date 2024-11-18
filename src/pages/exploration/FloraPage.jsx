import React from "react";
import "./Exploration.css";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/home/footer/Footer";
import Flora from "../../components/exploration/sectionFlora/Flora";

const FloraPage = () => {
  return (
    <>
      <NavBar />
      <Flora />
      <Footer bgcolor={"#486ECA"} color={"white"} />
    </>
  );
};

export default FloraPage;
