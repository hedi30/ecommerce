import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetch_guns = createAsyncThunk("guns/fetch_guns", async () => {
  try {
    const response = await api.get("/guns");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const gunReducer = createSlice({
  name: "guns",
  initialState: {
    guns: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch_guns.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetch_guns.fulfilled, (state, action) => {
        state.loading = false;
        state.guns = action.payload;
        state.error = null;
      })
      .addCase(fetch_guns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default gunReducer.reducer;
