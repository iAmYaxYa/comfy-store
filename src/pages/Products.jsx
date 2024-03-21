import { customFetch } from "../utilities/index";
import { Filters, PaginationContainer, ProductsContainer } from "../components";

const productsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } =
    queryParams;

  return {
    queryKey: [
      "products",
      search ?? "",
      category ?? "all",
      company ?? "all",
      sort ?? "a-z",
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () => customFetch.get(`/products`, { params: queryParams }),
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      const {
        data: { data: products, meta },
      } = await queryClient.ensureQueryData(productsQuery(params));
      return {
        products,
        meta,
        params,
      };
    } catch (error) {
      return error?.response?.data?.data;
    }
  };

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;
