import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    userState: userReducer,
  },
});

export default store;
