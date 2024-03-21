import { FeaturedProducts, Hero } from "../components";
import { customFetch } from "../utilities";

const url = "/products?featured=true";

const featuredProductsQuery = {
  queryKey: ["featuredProducts"],
  queryFn: () => customFetch(url),
};

export const loader = (queryClient) => async () => {
  try {
    const response = await queryClient.ensureQueryData(featuredProductsQuery);
    return { products: response?.data?.data };
  } catch (error) {
    return error?.response?.data;
  }
};
const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

export default Landing;
