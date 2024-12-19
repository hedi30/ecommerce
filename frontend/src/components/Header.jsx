import logo from "../assets/image.png";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaShoppingCart, FaList } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagramSquare,
  FaUser,
} from "react-icons/fa";

const Header = () => {
  const { userInfo, isAuthenticated } = useSelector((state) => state.auth);
  const [categoryShow, setCategoryShow] = useState(true);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const categories = [
    "Handguns",
    "Rifles",
    "Shotguns",
    "Submachine Guns",
    "Assault Rifles",
    "Sniper Rifles",
    "Machine Guns",
    "Antique Firearms",
  ];
  const [searchValue, setSearchValue] = useState("");
  const { card_products_count } = useSelector((state) => state.card);
  const { pathname } = useLocation();
  const handleUserIconClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };
  const handleCardIconClick = () => {
    if (isAuthenticated) {
      navigate("/card");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="w-full bg-white">
      <div className="header-top bg-[#030712] md-lg:hidden">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="flex w-full justify-between items-center h-[50px] text-slate-500">
            <ul className="flex justify-start items-center gap-8 font-semibold text-white">
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
                <div className="flex justify-center items-center gap-4 text-white ">
                  <a href="google.com">
                    <FaFacebookF />
                  </a>
                  <a href="google.com">
                    <FaTwitter />
                  </a>
                  <a href="google.com">
                    <FaInstagramSquare />
                  </a>

                  {isAuthenticated && userInfo ? (
                    <Link
                      className="flex cursor-pointer justify-center items-center gap-2 text-sm text-white"
                      to="/dashboard"
                    >
                      <span>
                        <FaUser />
                      </span>
                      <span> {userInfo.name}</span>
                    </Link>
                  ) : (
                    <Link
                      className="flex cursor-pointer justify-center items-center gap-2 text-sm text-white"
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
                      className={`p-2 block ${pathname === "/" ? "text-[#030712]" : "text-slate-600"}`}
                    >
                      HOME
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/shop"
                      className={`p-2 block ${pathname === "/shop" ? "text-[#030712]" : "text-slate-600"}`}
                    >
                      SHOP
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className={`p-2 block ${pathname === "/about" ? "text-[#030712]" : "text-slate-600"}`}
                    >
                      ABOUT US
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className={`p-2 block ${pathname === "/contact" ? "text-[#030712]" : "text-slate-600"}`}
                    >
                      CONTACT US
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-3/12 flex justify-end items-center gap-5">
                <div
                  onClick={handleUserIconClick}
                  className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
                >
                  <span className="text-xl text-black ">
                    <FaUserLarge />
                  </span>
                  <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]"></div>
                </div>

                <div
                  onClick={handleCardIconClick}
                  className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
                >
                  <span className="text-xl text-black ">
                    <FaShoppingCart />
                  </span>
                  <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                    {card_products_count}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[85%] mx-auto ">
        <div className="flex w-full flex-wrap ">
          <div className="w-3/12 ">
            <div className="bg-white relative">
              <div
                onClick={() => setCategoryShow(!categoryShow)}
                className="h-[50px] bg-[#030712] text-white flex justify-center items-center gap-3 font-bold text-md cursor-pointer "
              >
                <div className="flex justify-center items-center gap-3 ">
                  <span>
                    <FaList />
                  </span>
                  <span> All Categories </span>
                </div>
                <div
                  className={`${categoryShow ? "h-0" : "h-[400px]"} overflow-hidden top-[50px] left-0 transition-all duration-500 absolute z-[99999] bg-black w-full border-x`}
                >
                  <ul className="py-2 text-slate-600 font-medium ">
                    {" "}
                    {categories.map((c, i) => {
                      return (
                        <li
                          key={i}
                          className="text-white flex justify-center items-center gap-2 px-[24px] py-[6px]"
                        >
                          <Link className="text-sm block"> {c} </Link>
                        </li>
                      );
                    })}{" "}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="w-9/12 pl-8 ">
            <div className="flex flex-rap w-full justify-between items-center ">
              <div className="w-8/12 ">
                <div className="flex border h-[50px] items-center relative gap-6 ">
                  <div className="relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] ">
                    <select
                      className="w-[150px] text-slate-600 font-semibold bg-transparent px-2 h-full outline-0 border-none "
                      name=""
                      id=""
                    >
                      <option value=""> select category </option>
                      {categories.map((c, i) => {
                        return (
                          <option key={i} value={c}>
                            {c}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <input
                    className="w-full relative bg-transparent text-slate-500 outline-none px-3 h-full"
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                    type="text"
                    name=""
                    id=""
                    placeoholder="Search for products"
                  />
                  <button className="bg-[#030712] right-0 px-8 absolute h-full font-semibold uppercase text-white ">
                    Search{" "}
                  </button>
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
