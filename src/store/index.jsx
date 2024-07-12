import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/AuthReducer";

const store = configureStore({ reducer: authReducer });

export default store;
