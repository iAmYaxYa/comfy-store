import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || initialState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, { payload }) => {
      const { product } = payload;
      const item = state.cartItems.find(
        (item) => item?.cartId === product.cartId
      );
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }
      console.log(product);
      state.numItemsInCart += Number(product.amount);
      state.cartTotal += Number(product.price) * Number(product.amount);
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("item added to cart");
    },
    clearCart: (state) => {
      // state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(initialState));
      return initialState;
    },
    removeItem: (state, { payload }) => {
      const { cartId } = payload;
      const product = state.cartItems.find((item) => item.cartId === cartId);
      state.cartItems = state.cartItems.filter(
        (item) => item.cartId !== cartId
      );

      state.numItemsInCart -= product.amount;
      state.cartTotal -= product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.error("Item removed from cart");
    },
    editItem: (state, { payload }) => {
      const { cartID, amount } = payload;
      const item = state.cartItems.find((i) => i.cartID === cartID);
      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Cart updated");
    },
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

// EXPORT ACTIONS
export const { clearCart, addItem, removeItem, editItem } = cartSlice.actions;
// EXPORT REDUCER
export default cartSlice.reducer;
