import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
export const loging = createAsyncThunk("auth/login", async (info) => {
  try {
    const response = await api.post("/auth/login", info, {
      withcredentials: true,
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
});

export const register = createAsyncThunk("auth/register", async (info) => {
  try {
    const response = await api.post("/auth/register", info, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/check-auth", {
        withCredentials: true, // Important for sending cookies
      });
      console.log(response);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Authentication check failed",
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(clearAuthState());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  },
);

const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: null,
    isAuthenticated: false,
  },
  reducers: {
    clearAuthState: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
      state.loader = false;
      state.userInfo = null;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
    },
    clearMessages: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loging.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
      })
      .addCase(loging.fulfilled, (state, action) => {
        state.loader = false;
        state.userInfo = action.payload.user;
        state.isAuthenticated = true;
        state.successMessage = "Login successful";
      })
      .addCase(loging.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.message || "Login failed";
      })

      .addCase(checkAuth.pending, (state) => {
        state.loader = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.userInfo = null;
        state.isAuthenticated = false;
      })
      .addCase(register.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
        state.successMessage = "";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loader = false;
        state.userInfo = action.payload.user;
        state.isAuthenticated = true;
        state.successMessage = "Registration successful";
      })
      .addCase(register.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.message || "Registration failed";
        state.isAuthenticated = false;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loader = true;
        state.errorMessage = "";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loader = false;
        state.userInfo = null;
        state.isAuthenticated = false;
        state.successMessage = "Logged out successfully";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload || "Logout failed";
      });
  },
});

export const { logout, clearMessages, clearAuthState } = authReducer.actions;
export default authReducer.reducer;
