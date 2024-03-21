import { Link, useLoaderData } from "react-router-dom";
import {
  customFetch,
  formatPrice,
  generateAmountOptions,
} from "../utilities/index";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../app/features/cart/cartSlice";

const productDetailQuery = (id) => {
  return {
    queryKey: ["productDetail", id],
    queryFn: () => customFetch(`products/${id}`),
  };
};

export const loader = (queryClient) => async (request) => {
  const id = request?.params?.id;
  try {
    const response = await queryClient.ensureQueryData(productDetailQuery(id));
    return { product: response?.data?.data };
  } catch (error) {
    return error?.response?.data?.data;
  }
};
const ProductDetail = () => {
  const { product } = useLoaderData();
  const { image, title, price, description, colors, company } =
    product?.attributes;
  const dollarAmount = formatPrice(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();
  // if (!data) {
  //   return redirect("/");
  // }

  const cartProduct = {
    cartId: product.id + productColor,
    id: product?.id,
    image,
    title,
    price,
    description,
    productColor,
    company,
    amount,
  };

  const addCart = () => {
    dispatch(
      addItem({
        product: cartProduct,
      })
    );
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      {/* PRODUCT */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2  lg:gap-x-16">
        {/* IMAGE */}
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full  "
        />
        {/* PRODUCT INFO */}
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>

          <p className="mt-3 text-xl">{dollarAmount}</p>

          <p className="mt-6 leading-8">{description}</p>

          {/* COLORS */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type="button"
                    className={`badge  w-6 h-6 mr-2  ${
                      color === productColor && "border-2 border-secondary"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  ></button>
                );
              })}
            </div>
          </div>
          {/* AMOUNT */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <h4 className="text-md font-medium tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md"
              value={amount}
              onChange={handleAmount}
            >
              {generateAmountOptions(10)}
            </select>
          </div>
          {/* CART BUTTON */}
          <div className="mt-10 ">
            <button className="btn btn-secondary btn-md" onClick={addCart}>
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
