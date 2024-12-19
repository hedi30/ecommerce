import React from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { update_quantity, remove_item } from "../store/Reducers/CardReducer";
import { toast } from "react-hot-toast";
const Card = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { card_products, card_products_count, price, loading } = useSelector(
    (state) => {
      return {
        card_products: state.card.card_products || [],
        card_products_count: state.card.card_products_count || 0,
        price: state.card.price || 0,
        loading: state.card.loading,
      };
    },
  );

  const redirect = () => {
    navigate("/shipping", {
      state: {
        products: card_products,
        price: price,
        shipping_fee: 10,
        items: card_products_count,
      },
    });
  };

  const handleQuantityChange = async (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;

    try {
      await dispatch(
        update_quantity({
          productId, // The ID of the product
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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  if (loading) {
    return (
      <div>
        <Header />
        <div className="h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Header />
      <section className="bg-[#eeeeee] my-3">
        <div className="w-[85%] mx-auto py-16">
          {card_products && card_products.length > 0 ? (
            <div className="flex flex-wrap">
              <div className="w-[67%]">
                <div className="pr-3">
                  <div className="flex flex-col gap-3">
                    <div className="bg-white p-4">
                      <h2 className="text-md text-green-500 font-semibold">
                        Cart Products ({card_products_count})
                      </h2>
                    </div>

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
                                {product.oldPrice && (
                                  <p className="line-through">
                                    ${product.oldPrice}
                                  </p>
                                )}
                                {product.discount && (
                                  <p>{product.discount}% off</p>
                                )}
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
                  </div>
                </div>
              </div>
              <div className="w-[33%]">
                <div className="pl-3">
                  <div className="bg-white p-3 text-slate-600 flex flex-col gap-3">
                    <h2 className="text-xl font-bold">Order Summary</h2>
                    <div className="flex justify-between items-center">
                      <span>{card_products_count} items</span>
                      <span>${price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Shipping fee</span>
                      <span>$10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total</span>
                      <span className="font-bold">${price + 10}</span>
                    </div>
                    <button
                      onClick={redirect}
                      className="px-5 py-[6px] rounded-sm hover:shadow-black-500/50 hover:shadow-lg bg-red-500 text-sm text-white uppercase"
                    >
                      Proceed to checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[60vh] flex flex-col gap-4 justify-center items-center">
              <h2 className="text-2xl font-bold text-slate-600">
                Your cart is empty
              </h2>
              <Link
                className="px-6 py-2 bg-[#030712] text-white rounded-md hover:bg-blue-600"
                to="/shop"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default Card;
