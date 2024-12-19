import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
export const add_to_card = createAsyncThunk(
  "card/add_to_card",
  async (productInfo, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/card/add", productInfo, {
        withCredentials: true,
      });

      await dispatch(fetch_card_items());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const fetch_card_items = createAsyncThunk(
  "card/fetch_items",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/card", {
        withCredentials: true,
      });

      const cartData = response.data.data.card;
      return {
        items: cartData.items || [],
        totalAmount: cartData.totalAmount || 0,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch cart items",
      );
    }
  },
);

export const update_quantity = createAsyncThunk(
  "card/update_quantity",
  async ({ productId, quantity }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(
        `/card/item/${productId}`,
        { quantity },
        {
          withCredentials: true,
        },
      );

      await dispatch(fetch_card_items());
      return response.data.data.card;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update quantity",
      );
    }
  },
);

export const remove_item = createAsyncThunk(
  "card/remove_item",
  async (productId, { dispatch, rejectWithValue }) => {
    try {
      await api.delete(`/card/item/${productId}`, {
        withCredentials: true,
      });
      await dispatch(fetch_card_items());
      return productId;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to remove item");
    }
  },
);

export const clear_cart = createAsyncThunk(
  "card/clear_cart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete("/card/clear", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to clear cart");
    }
  },
);

const cardReducer = createSlice({
  name: "card",
  initialState: {
    card_products: [],
    card_products_count: 0,
    price: 0,
    successMessage: "",
    errorMessage: "",
    shipping_fee: 0,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(add_to_card.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(add_to_card.fulfilled, (state) => {
        // Don't modify the state here, let fetch_card_items handle it
        state.loading = false;
        state.successMessage = "Product added to cart successfully";
      })
      .addCase(add_to_card.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage =
          action.payload?.message || "Failed to add product to cart";
      })
      .addCase(fetch_card_items.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetch_card_items.fulfilled, (state, action) => {
        state.loading = false;
        state.card_products = action.payload.items;
        state.card_products_count = action.payload.items.length;
        state.price = action.payload.totalAmount;
      })
      .addCase(fetch_card_items.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch cart items";
      })

      .addCase(remove_item.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(remove_item.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Item removed successfully";
      })
      .addCase(remove_item.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload || "Failed to remove item";
      })

      .addCase(clear_cart.fulfilled, (state) => {
        state.card_products = [];
        state.card_products_count = 0;
        state.price = 0;
        state.loading = false;
      });
  },
});

export default cardReducer.reducer;
