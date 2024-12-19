import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaList } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../store/Reducers/orderReducer";
import { AiOutlineLogout } from "react-icons/ai";
import { logoutUser } from "../store/Reducers/authReducer";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const orderData = orders?.data?.orders || {};

  const orderArray = Array.isArray(orderData) ? orderData : [orderData];

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Logout failed");
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-900 my-3">
        <div className="w-[85%] mx-auto py-8">
          <div className="flex gap-6">
            {/* Sidebar */}
            <div className="w-1/4">
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center gap-4 pb-6 border-b border-gray-700">
                  <div className="w-16 h-16 rounded-full bg-gray-700"></div>
                  <div>
                    <h3 className="text-white font-semibold">
                      {userInfo?.name || "User"}
                    </h3>
                    <p className="text-gray-400 text-sm">Customer</p>
                  </div>
                </div>
                <nav className="mt-6">
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-gray-300 hover:text-white cursor-pointer p-2 rounded hover:bg-gray-700">
                      <FaList />
                      <span>My Orders</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-300 hover:text-white cursor-pointer p-2 rounded hover:bg-gray-700">
                      <FaList />
                      <span>Wishlist</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-300 hover:text-white cursor-pointer p-2 rounded hover:bg-gray-700">
                      <FaList />
                      <span>Settings</span>
                    </li>
                    <li
                      onClick={handleLogout}
                      className="flex items-center gap-3 text-gray-300 hover:text-white cursor-pointer p-2 rounded hover:bg-gray-700"
                    >
                      <AiOutlineLogout />
                      <span>Logout</span>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-3/4">
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Recent Orders
                </h2>
                {loading ? (
                  <div className="text-white">Loading orders...</div>
                ) : error ? (
                  <div className="text-red-500">{error}</div>
                ) : (
                  <div className="space-y-4">
                    {orderArray.map((order) => (
                      <div
                        key={order._id}
                        className="bg-gray-700 p-4 rounded-lg"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-white">Order #{order._id}</h3>
                            <p className="text-gray-400 text-sm">
                              Placed on:{" "}
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 ${order.status === "delivered" ? "bg-green-500" : "bg-green-500"} text-white rounded-full text-sm`}
                          >
                            {order.status || "Delivered"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Total Purchases
                  </h3>
                  <p className="text-3xl text-green-500 font-bold">
                    $
                    {orderArray.reduce(
                      (total, order) => total + order.totalAmount,
                      0,
                    ) || 0}
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Wishlist Items
                  </h3>
                  <p className="text-3xl text-blue-500 font-bold">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Dashboard;
