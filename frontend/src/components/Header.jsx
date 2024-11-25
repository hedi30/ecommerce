import React from "react";
import logo from "../assets/image.png";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagramSquare,
  FaUser,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const user = false;
  const whishlist = 3;
  const { pathname } = useLocation();
  return (
    <div className="w-full bg-white">
      <div className="header-top bg-[#caddff] md-lg:hidden">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="flex w-full justify-between items-center h-[50px] text-slate-500">
            <ul className="flex justify-start items-center gap-8 font-semibold text-black">
              <li className="flex relative justify-center items-center gap-2 text-sm after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]">
                <span>
                  <MdEmail />
                </span>
                <span>support@gmail.tn</span>
              </li>

              <li className="flex relative justify-center items-center gap-2 text-sm ">
                <span>
                  <FaPhone />
                </span>
                <span>+216 52-419-533</span>
              </li>
            </ul>
            <div>
              <div className="flex justify-center items-center gap-10">
                <div className="flex justify-center items-center gap-4 text-black ">
                  <a href="#">
                    <FaFacebookF />
                  </a>
                  <a href="#">
                    <FaTwitter />
                  </a>
                  <a href="#">
                    <FaInstagramSquare />
                  </a>
                  <a href="#"></a>

                  {user ? (
                    <Link
                      className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                      to="/dashboard"
                    >
                      <span>
                        <FaUser />
                      </span>
                      <span> kilyan mbappe</span>
                    </Link>
                  ) : (
                    <Link
                      className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                      to="/login"
                    >
                      <span> Login</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="h-[80px] md-lg:h-[100px] flex justify-between items-center">
            <div className="flex items-center w-full justify-between">
              <div className="w-3/12 md-lg:pt-4">
                <Link to="/">
                  <img src={logo} alt="Logo" className="h-20" />
                </Link>
              </div>
              <div className="w-6/12">
                <ul className="flex justify-start items-center gap-8 text-sm font-bold uppercase pl-8">
                  <li>
                    <Link
                      to="/"
                      className={`p-2 block ${pathname === "/" ? "text-[#059437]" : "text-slate-600"}`}
                    >
                      HOME
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/shop"
                      className={`p-2 block ${pathname === "/shop" ? "text-[#059437]" : "text-slate-600"}`}
                    >
                      SHOP
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className={`p-2 block ${pathname === "/about" ? "text-[#059437]" : "text-slate-600"}`}
                    >
                      ABOUT US
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contactus"
                      className={`p-2 block ${pathname === "/contactus" ? "text-[#059437]" : "text-slate-600"}`}
                    >
                      CONTACT US
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-3/12 flex justify-end items-center gap-5">
                <div className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]">
                  <span className="text-xl text-green-500 ">
                    <FaHeart />
                  </span>
                  <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                    {whishlist}
                  </div>
                </div>

                <div className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]">
                  <span className="text-xl text-green-500 ">
                    <FaShoppingCart />
                  </span>
                  <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                    {whishlist}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
