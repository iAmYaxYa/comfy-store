import { Form, Link, redirect } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { toast } from "react-toastify";
import { customFetch } from "../utilities";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.post("/auth/local/register", data);
    console.log(response);
    toast.success("account created successfully");
    redirect("/login");
  } catch (error) {
    console.log(error);
    const errorMessage =
      error?.response?.data || "please double check your credentials";
    toast.error(errorMessage);
    return null;
  }
  return null;
};

const Register = () => {
  return (
    <div className="h-screen grid place-items-center">
      <Form
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
        method="post"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput
          label="username"
          placeHolder="User Name"
          type="text"
          name="username"
        />
        <FormInput
          label="email"
          placeHolder="Email"
          type="email"
          name="identifier"
        />
        <FormInput
          label="password"
          placeHolder="Password"
          type="password"
          name="password"
        />
        <div className="mt-4">
          <SubmitBtn text="Register" />
        </div>
        <p className="text-center">
          Already a member?
          <Link
            className="ml-2 link link-hover link-primary capitalize"
            to="/login"
          >
            login
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default Register;
