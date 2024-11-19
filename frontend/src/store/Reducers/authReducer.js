import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
export const loging = createAsyncThunk("auth/login", async (info) => {
  try {
    const response = await api.post("/login", info, {
      withcredentials: true,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});

const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "",
  },
  reducers: {},
});
export default authReducer.reducer;
