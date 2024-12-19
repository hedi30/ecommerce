import React from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";

import { FaSkull } from "react-icons/fa6";
import "react-multi-carousel/lib/styles.css";
const Banner = () => {
  return (
    <section className="bg-[url('https://www.blueline.ca/wp-content/uploads/2021/11/AdobeStock_302398979-1024x398.jpg')] h-[300px] mt-6 bg-cover bg-no-repeat relative bg-left">
      <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
        <div className="w-[85%] h-full mx-auto">
          <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
            <FaSkull />
            <div className="flex justify-center items-center gap-2 text-2xl w-full "></div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Banner;
