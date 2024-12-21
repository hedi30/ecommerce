import React, { useState } from "react";
import Header from "../components/Header";
import { FaSkull } from "react-icons/fa6";
import { Range } from "react-range";
import Gun from "../components/guns/Gun";
import Footer from "../components/Footer";
const Shop = () => {
  const gunCategories = [
    "Handguns",
    "Rifles",
    "Shotguns",
    "Submachine Guns",
    "Assault Rifles",
    "Sniper Rifles",
    "Machine Guns",
    "Antique Firearms",
  ];

  const [sortOrder, setSortOrder] = useState("low-to-high");

  const [state, setState] = useState({ values: [50, 30000] });

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (e) => {
    const category = e.target.id;
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  return (
    <div>
      <Header />
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

      <section className="py-16">
        <div className="w-[85%] h-full mx-auto">
          <div className="w-full flex flex-wrap ">
            <div className="{`w-3/12 pr-8 `}">
              <h2 className="text-3xl font-bold mb-3 text-slate-600">
                Category{" "}
              </h2>
              <div className="py-2">
                {gunCategories.map((c, i) => (
                  <div
                    className="flex justify-start items-center gap-2 py-1"
                    key={i}
                  >
                    <input
                      checked={selectedCategories.includes(c)}
                      onChange={handleCategoryChange}
                      type="checkbox"
                      id={c}
                    />
                    <label
                      className="text-slate-600 block cursor-pointer"
                      htmlFor={c}
                    >
                      {c}
                    </label>
                  </div>
                ))}
              </div>
              <div className="py-2 flex flex-col gap-5 ">
                <h2 className="text-3xl font-bold mb-3 text-slate-600">
                  Price
                </h2>
                <Range
                  step={5}
                  min={50}
                  max={30000}
                  values={state.values}
                  onChange={(values) => setState({ values })}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      className="w-full h-[6px] bg-slate-200 rounded-full cursor-pointer"
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      className="w-[15px] h-[15px] bg-slate-950 rounded-full "
                      {...props}
                    >
                      {" "}
                    </div>
                  )}
                />
                <span>
                  {" "}
                  ${Math.floor(state.values[0])} - $
                  {Math.floor(state.values[1])}{" "}
                </span>
              </div>

              <div className="py-3 flex flex-col gap-4 ">
                <h2 className="text-3xl font-bold mb-3 text-slate-600 "> </h2>{" "}
              </div>
            </div>
            <div className="w-9/12 ">
              <div className="pl-8">
                <div className="py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border">
                  <h2 className="text-lg font-medium text-slate-600">
                    {" "}
                    GUNS {}
                  </h2>

                  <div className="flex justify-center items-center gap-3 ">
                    <select
                      className="p-1 border outline-0 text-slate-600 font-semibold "
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                    >
                      <option value="low-to-high"> Low to high price </option>
                      <option value="high-to-low"> High to low price </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="pl-8 pb-8 ">
                <Gun
                  sortOrder={sortOrder}
                  selectedCategories={selectedCategories}
                  priceRange={state.values}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default Shop;
