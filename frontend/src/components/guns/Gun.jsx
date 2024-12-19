import React, { useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { add_to_card } from "../../store/Reducers/CardReducer";
import { useDispatch, useSelector } from "react-redux";
import { fetch_guns } from "../../store/Reducers/gunReducer";
import { toast } from "react-hot-toast";
const Gun = () => {
  const dispatch = useDispatch();
  const { guns, loading, error } = useSelector((state) => state.guns);
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetch_guns());
  }, [dispatch]);

  const handleAddToCart = async (gun) => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      await dispatch(
        add_to_card({
          productId: gun._id,
          name: gun.name,
          price: gun.price,
          category: gun.category,
          quantity: 1,
          image: gun.image,
        }),
      ).unwrap();

      toast.success("Added to cart successfully");
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        Error loading guns: {error}
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {guns.map((gun) => (
        <div
          key={gun._id}
          className="flex transition-all duration-1000 hover:shadow-md hover:-translate-y-3 flex-col justify-start items-start w-full gap-4 bg-white p-4 rounded-md"
        >
          <div className="w-full relative group h-[210px] overflow-hidden">
            <img
              src={gun.image}
              alt={gun.name}
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => handleAddToCart(gun)}
                className="p-3 bg-white rounded-full hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                <FaCartShopping className="text-2xl" />
              </button>
            </div>
          </div>

          <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {gun.name}
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-red-500 font-bold">${gun.price}</span>
              <span className="text-sm text-gray-500">{gun.category}</span>
            </div>
          </div>
        </div>
      ))}

      {guns.length === 0 && !loading && !error && (
        <div className="col-span-full text-center py-8 text-gray-500">
          No guns available
        </div>
      )}
    </div>
  );
};

export default Gun;
