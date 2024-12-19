import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetch_guns } from "../store/Reducers/gunReducer";

import { useNavigate } from "react-router-dom";
const NewProducts = () => {
  const dispatch = useDispatch();
  const { guns, loading, error } = useSelector((state) => state.guns);

  const navigate = useNavigate(); // Add this
  useEffect(() => {
    dispatch(fetch_guns());
  }, [dispatch]);

  const newGuns = guns?.slice(0, 4) || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleImageClick = () => {
    navigate("/shop");
  };

  return (
    <div className="w-[85%] flex flex-wrap mx-auto">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
          <h2> New Guns </h2>
          <div className="w-[100px] h-[2px] bg-black mt-4 "> </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-4 gap-6">
        {newGuns.map((gun) => (
          <div
            onClick={handleImageClick}
            key={gun._id}
            className="border group transition-all duration-500 hover-shadow-md hover:-mt-3"
          >
            <div className="relative overflow-hidden ">
              <img className="h-[240px]" src={gun.image} alt={gun.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default NewProducts;
