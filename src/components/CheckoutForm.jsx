// export const

import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { customFetch, formatPrice } from "../utilities";
import { toast } from "react-toastify";
import { clearCart } from "../app/features/cart/cartSlice";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    const user = store.getState().userState.user;
    const { cartItems, orderTotal, numItemsInCart } = store.getState().cart;

    const info = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
    };
    try {
      const response = await customFetch.post(
        "/orders",
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // remove query
      queryClient.removeQueries(["orders"]);
      // rest of code
      store.dispatch(clearCart());
      toast.success("order placed successfully");
      return redirect("/orders");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "there was an error placing your order";
      toast.error(errorMessage);
      if (error?.response?.status === 401 || 403) return redirect("/login");
      return null;
    }
  };

const CheckoutForm = () => {
  return (
    <Form method="post" className="flex flex-col gap-y-4">
      {/* FIRST NAME  */}
      <FormInput
        type="text"
        label="first name"
        placeHolder="First Name"
        name="name"
      />
      {/* ADDRESS  */}
      <FormInput
        type="text"
        label="address"
        placeHolder="Address"
        name="address"
      />
      {/* SUBMIT BTN  */}
      <SubmitBtn text="Place Your Order" />
    </Form>
  );
};

export default CheckoutForm;
