import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUserDetails,
  loginUser,
  registerUser,
} from "../../services/authAPI";
import { LS_KEY_USER_TOKENS } from "../../utils/constants";

const initialState = {
  currentUser: undefined,
  isLoggedIn: false,
  isLoading: false,
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await registerUser(userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await loginUser(userData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem(LS_KEY_USER_TOKENS);
      if (!token) {
        return thunkAPI.abort();
      }
      const response = await getCurrentUserDetails();

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem(LS_KEY_USER_TOKENS);
  return {
    success: true,
  };
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(signup.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action?.payload);
        state.isLoading = false;
        state.currentUser = action?.payload;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload?.data;
        state.isLoggedIn = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.currentUser = undefined;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = undefined;
        state.success = action.success;
        state.isLoggedIn = false;
      });
  },
});

export default authSlice.reducer;
