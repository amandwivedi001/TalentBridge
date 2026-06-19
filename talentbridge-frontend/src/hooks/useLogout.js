import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { logOut } from "../services/auth.service";
import { clearUser } from "../features/auth/authSlice";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await logOut();

      dispatch(clearUser());

      toast.success(
        "Logged out successfully"
      );

      navigate("/login");
    } catch (error) {
      toast.error(
        "Logout failed"
      );
    }
  };

  return logout;
};