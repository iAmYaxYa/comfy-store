import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { toast } from "react-toastify";
import { customFetch } from "../utilities";
import { loginUser } from "../app/features/user/userSlice";
import { useDispatch } from "react-redux";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const response = await customFetch.post("/auth/local", data);
      store.dispatch(loginUser(response.data));
      toast.success("logged in successfully");
      redirect("/");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "please double check your credentials";
      toast.error(errorMessage);
      return null;
    }

    return null;
  };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    try {
      const response = await customFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });
      toast.success("welcome guest user");
      dispatch(loginUser(response.data));
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("guest user login error.please try later.");
      return null;
    }
  };
  return (
    <div className="h-screen grid place-items-center">
      <Form
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
        method="post"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          label="email"
          type="email"
          name="identifier"
          defaultValue="test@test.com"
        />
        <FormInput
          label="password"
          type="password"
          name="password"
          defaultValue="secret"
        />
        <div className="mt-4">
          <SubmitBtn text="Login" />
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={loginAsGuestUser}
        >
          guest user
        </button>
        <p className="text-center">
          Not a member yet?
          <Link
            className="ml-2 link link-hover link-primary capitalize"
            to="/register"
          >
            register
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default Login;
