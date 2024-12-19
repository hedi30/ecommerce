import React from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NewProducts from "../components/NewProducts";

const Home = () => {
  return (
    <div className="w-full">
      <Header></Header>
      <Banner></Banner>
      <div className="py-[45px]">
        <NewProducts />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
