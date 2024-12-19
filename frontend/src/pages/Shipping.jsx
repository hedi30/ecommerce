import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Checkout from "../components/Checkout";
import { useNavigate } from "react-router-dom";
import { update_quantity, remove_item } from "../store/Reducers/CardReducer";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../store/Reducers/orderReducer";
import { clear_cart } from "../store/Reducers/CardReducer";
import Footer from "../components/Footer";
const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { card_products, price } = useSelector((state) => {
    return {
      card_products: state.card.card_products || [],
      card_products_count: state.card.card_products_count || 0,
      price: state.card.price || 0,
      loading: state.card.loading,
    };
  });

  const [res, setRes] = useState(false);

  const [state, setState] = useState({
    name: "",
    address: "",
    phone: "",
    post: "",
    province: "",
    city: "",
    area: "",
  });

  const inputHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const save = (e) => {
    e.preventDefault();
    const { name, address, phone, post, province, city, area } = state;
    if (name && address && phone && post && province && city && area) {
      setRes(true);
    }
  };

  const handlePlaceOrder = async () => {
    if (!res) {
      toast.error("Please fill shipping information first");
      return;
    }

    try {
      const orderData = {
        items: card_products.map((product) => ({
          product: product.productId,
          quantity: product.quantity,
          price: product.price,
        })),
        totalAmount: price,
        shippingInfo: {
          name: state.name,
          address: state.address,
          phone: state.phone,
          post: state.post,
          province: state.province,
          city: state.city,
          area: state.area,
        },
      };
      await dispatch(createOrder(orderData)).unwrap();
      await dispatch(clear_cart()).unwrap();
      toast.success("Order placed successfully!");
      navigate("/card");
    } catch (error) {
      toast.error(error.message || "Failed to place order");
    }
  };

  const handleQuantityChange = async (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;

    try {
      await dispatch(
        update_quantity({
          productId,
          quantity: newQuantity,
        }),
      ).unwrap();
      toast.success("Quantity updated");
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const handleRemoveItem = async (productId) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      try {
        await dispatch(remove_item(productId)).unwrap();
        toast.success("Item removed from cart");
      } catch (error) {
        toast.error("Failed to remove item");
      }
    }
  };

  const handleCheckoutSuccess = (details) => {
    handlePlaceOrder();
    toast.success("Payment successful!");
  };

  useEffect(() => {
    if (card_products.length === 0) {
      toast.error("Your cart is empty!");
      navigate("/card");
    }
  }, [card_products, navigate]);

  return (
    <div>
      <Header />
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] mx-auto py-16">
          <div className="w-full flex flex-wrap  ">
            <div className="w-[67%]">
              <div className="flex flex-col gap-3 ">
                <div className="bg-white p-6 shadow-sm rounded-md">
                  <h2 className="text-slate-600 font-bold pb-3 ">
                    shipping Inforamation
                  </h2>
                  {!res && (
                    <>
                      <form onSubmit={save}>
                        <div className="flex w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 w-full ">
                            <label htmlFor="name">Name</label>
                            <input
                              onChange={inputHandler}
                              value={state.name}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-black rounded-md "
                              name="name"
                              id="name"
                              placeholder="Name"
                            />
                          </div>
                          <div className="flex flex-col gap-1 w-full ">
                            <label htmlFor="address">Address</label>
                            <input
                              onChange={inputHandler}
                              value={state.address}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-black rounded-md "
                              name="address"
                              id="address"
                              placeholder="Adress"
                            />
                          </div>
                        </div>
                        <div className="flex w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 w-full ">
                            <label htmlFor="phone">Phone</label>
                            <input
                              onChange={inputHandler}
                              value={state.phone}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-black rounded-md "
                              name="phone"
                              id="phone"
                              placeholder="Phone"
                            />
                          </div>
                          <div className="flex flex-col gap-1 w-full ">
                            <label htmlFor="post">Post</label>
                            <input
                              onChange={inputHandler}
                              value={state.post}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-black rounded-md "
                              name="post"
                              id="post"
                              placeholder="Post"
                            />
                          </div>
                        </div>
                        <div className="flex w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 w-full ">
                            <label htmlFor="province">Province</label>
                            <input
                              onChange={inputHandler}
                              value={state.province}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-black rounded-md "
                              name="province"
                              id="province"
                              placeholder="Province"
                            />
                          </div>
                          <div className="flex flex-col gap-1 w-full ">
                            <label htmlFor="city">City</label>
                            <input
                              onChange={inputHandler}
                              value={state.city}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-black rounded-md "
                              name="city"
                              id="city"
                              placeholder="City"
                            />
                          </div>
                        </div>
                        <div className="flex w-full gap-5 text-slate-600">
                          <div className="flex flex-col gap-1 w-full ">
                            <label htmlFor="area">Area</label>
                            <input
                              onChange={inputHandler}
                              value={state.area}
                              type="text"
                              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-black rounded-md "
                              name="area"
                              id="area"
                              placeholder="Area"
                            />
                          </div>
                          <div className="flex flex-col mt-8 gap-1 w-full ">
                            <button className="px-3 py-[6px] rounded-sm hover:shadow-black-500/50 hover:shadow-lg bg-black text-white">
                              Save change
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                  {res && (
                    <div className="flex flex-col gap-1 ">
                      <h2 className="text-slate-600 font-semibold pb-2 pt-1 ">
                        Deliver to {state.name}
                      </h2>
                      <p>
                        <span className="bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded">
                          Home
                        </span>
                        <span>
                          {state.address} {state.province}
                          {state.province}
                          {state.city}
                          {state.area}
                        </span>
                        <span
                          onClick={() => setRes(false)}
                          className="text-indigo-500 cursor-pointer"
                        >
                          change
                        </span>
                      </p>
                      <p className="text-slate-600 text-sm">
                        {" "}
                        email to shop@guns.com{" "}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {
                <div className="flex bg-white p-4 flex-col gap-2">
                  {card_products.map((product) => (
                    <div
                      key={product.ProductId}
                      className="flex bg-white p-4 flex-col gap-2"
                    >
                      <div className="flex justify-start items-start">
                        <h2 className="text-md text-slate-600 font-bold">
                          Gun shop
                        </h2>
                      </div>
                      <div className="w-full flex flex-wrap">
                        <div className="flex gap-2 w-7/12">
                          <div className="flex gap-2 justify-start items-center">
                            <img
                              className="w-[80px] h-[80px] object-cover"
                              src={product.image}
                              alt={product.name}
                            />
                            <div className="pr-4 text-slate-600">
                              <h2 className="text-md font-semibold">
                                {product.name}
                              </h2>
                              <span className="text-sm">
                                Category: {product.category || "rifle"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between w-5/12">
                          <div className="pl-4">
                            <h2 className="text-lg text-orange-500">
                              ${product.price}
                            </h2>
                            {product.discount && <p>{product.discount}% off</p>}
                          </div>
                          <div className="flex gap-2 flex-col">
                            <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                              <div
                                className="px-3 cursor-pointer hover:bg-gray-300"
                                onClick={() =>
                                  handleQuantityChange(
                                    product.productId,
                                    product.quantity,
                                    -1,
                                  )
                                }
                              >
                                -
                              </div>
                              <div className="px-3">{product.quantity}</div>
                              <div
                                className="px-3 cursor-pointer hover:bg-gray-300"
                                onClick={() =>
                                  handleQuantityChange(
                                    product.productId,
                                    product.quantity,
                                    1,
                                  )
                                }
                              >
                                +
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                handleRemoveItem(product.productId)
                              }
                              className="px-5 py-[3px] bg-red-500 text-white hover:bg-red-600 transition-colors"
                            >
                              delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              }
            </div>

            <div className="w-[33%]  ">
              <div className="pl-3 ">
                {" "}
                <div className="bg-white p-3 text-slate-600 flex flex-col gap-3 ">
                  <h2 className="text-xl font-bold">order summary </h2>
                  <div className="flex justify-between items-center">
                    <span> Price </span> <span>${price - 10} </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span> shipping fee </span> <span> $10 </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Total </span>{" "}
                    <span className="font-bold"> ${price} </span>
                  </div>
                  <button
                    disabled={res ? false : true}
                    className="px-5 py-[6px] rounded-sm hover:shadow-black-500/50 hover:shadow-lg bg-red-500 text-sm text-white uppercase "
                  >
                    Place order
                    <Checkout
                      price={price}
                      onSuccess={handleCheckoutSuccess}
                      disabled={res ? false : true}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default Shipping;
