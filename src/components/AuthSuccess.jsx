import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, setLoading, setError } from "../redux/authSlice";
import {jwtDecode} from "jwt-decode";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const authenticateUser = async () => {
      dispatch(setLoading(true));

      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (!token) {
          throw new Error("No token provided");
        }

        // Decode JWT token to extract user details
        const decodedUser = jwtDecode(token);

        // Store user in Redux store
        dispatch(login(decodedUser));

        // Save token in localStorage for persistence
        // localStorage.setItem("token", token);

        navigate("/"); // Redirect to dashboard after login
      } catch (error) {
        dispatch(setError(error.message));
        navigate("/login");
      } finally {
        dispatch(setLoading(false));
      }
    };

    authenticateUser();
  }, [navigate, dispatch]);

  return <div>Authenticating...</div>;
};

export default AuthSuccess;
