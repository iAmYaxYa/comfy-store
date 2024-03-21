import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../app/features/user/userSlice";
import { clearCart } from "../app/features/cart/cartSlice";
import { useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.userState.user);

  const queryClient = useQueryClient();

  const handleLogoutUser = () => {
    navigate("/");
    dispatch(logoutUser());
    dispatch(clearCart());
    queryClient.removeQueries();
  };

  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">Hello, {user.username}</p>
            <button
              className="btn btn-xs btn-outline btn-primary "
              onClick={handleLogoutUser}
            >
              logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="Sign in / Guest">
              Sign in / Guest
            </Link>
            <Link to="/register" className="Sign in / Guest">
              Create an Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
