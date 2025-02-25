import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook,FaUpload } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice"; // Import login action
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", rePassword: "", image: null });
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    if (name === "password") {
      const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      if (!passwordRegex.test(value)) {
        newErrors.password = "Password must be 8+ chars, include a number, uppercase,special char.";
      } else {
        delete newErrors.password;
      }
    }

    if (name === "rePassword" && value !== formData.password) {
      newErrors.rePassword = "Passwords do not match.";
    } else if (name === "rePassword" && value === formData.password) {
      delete newErrors.rePassword;
    }

    setErrors(newErrors);
  };

  const dispatch = useDispatch();
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0 || (isLogin && !formData.password) || (!isLogin && (!formData.password || !formData.rePassword))) {
      setShake(true);
      setTimeout(() => setShake(false), 500); // Reset shake after 0.5 seconds
      return;
    }

    try {
      // Determine API endpoint based on login/signup state
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
  
      // Send request to backend
      console.log("form Data:",formData);
      const {data}  = await axios.post(`http://localhost:7777${endpoint}`, formData, {
        withCredentials: true, // Ensure cookies are handled properly
      });
      console.log(data);
      // Store token in cookies (optional)
      // document.cookie = `token=${data.token}; path=/;`;
  
      // Dispatch user data to Redux
      dispatch(login(data.user)); // Assuming `data.user` contains user details
  
      // Reset form data and login state
      setFormData({ name: "", email: "", password: "" });
      setIsLogin(true);
  
      // Redirect user after successful authentication
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
    }
  };
  

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-800 px-4">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden mt-16"> {/* Added margin-top */}
        
        {/* Animated Left Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "signup"}
            initial={{ x: isLogin ? "-100%" : "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isLogin ? "-100%" : "100%", opacity: 0 }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className={`md:w-1/2 w-full flex flex-col justify-center items-center p-10 ${
              isLogin
                ? "bg-gradient-to-br from-blue-500 to-blue-600"
                : "bg-gradient-to-br from-blue-400 to-blue-600"
            } text-white ${isLogin ? "order-1" : "order-2"}`}
          >
            <h2 className="text-3xl font-bold mb-4">{isLogin ? "Welcome Back!" : "Join Us Today!"}</h2>
            <p className="text-center text-sm md:text-base">
              {isLogin
                ? "Log in to access your personalized dashboard and continue your journey with us."
                : "Sign up now to unlock exclusive features, content, and more!"}
            </p>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="mt-5 px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Form Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "loginForm" : "signupForm"}
            initial={{ x: isLogin ? "100%" : "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isLogin ? "100%" : "-100%", opacity: 0 }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className={`md:w-1/2 w-full p-10 flex flex-col justify-center ${
              isLogin ? "order-2" : "order-1"
            }`}
          >
            <h2 className="text-2xl font-semibold text-center mb-5">{isLogin ? "Login" : "Sign Up"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              {!isLogin && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`border p-2 rounded-md focus:ring-2 focus:ring-blue-500 ${
                  errors.password || shake ? "border-red-500 shake" : ""
                }`}
                required
              />
              {errors.password && <p className="text-red-500 text-xs whitespace-nowrap">{errors.password}</p>} {/* Single-line error */}
              {!isLogin && (
                <>
                  <input
                    type="password"
                    name="rePassword"
                    placeholder="Re-enter Password"
                    value={formData.rePassword}
                    onChange={handleChange}
                    className={`border p-2 rounded-md focus:ring-2 focus:ring-blue-500 ${
                      errors.rePassword || shake ? "border-red-500 shake" : ""
                    }`}
                    required
                  />
                  {errors.rePassword && <p className="text-red-500 text-xs whitespace-nowrap">{errors.rePassword}</p>} {/* Single-line error */}
                </>
              )}
              {!isLogin && (
                <div className="flex items-center space-x-2">
                  <label htmlFor="image" className="cursor-pointer">
                    <FaUpload className="text-blue-500 text-2xl" /> {/* Dummy icon */}
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span className="text-sm text-gray-600">Upload Profile Picture</span>
                </div>
              )}
              <button
                type="submit"
                className="bg-gradient-to-br from-blue-500 to-blue-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
              <div className="flex justify-center space-x-4 mt-3">
                <a href="http://localhost:7777/api/auth/google" className="flex items-center space-x-2 border px-4 py-2 rounded-md shadow-md hover:bg-gray-200 transition">
                  <FcGoogle size={20} />
                  <span>Google</span>
                </a>
                <a href="#" className="flex items-center space-x-2 border px-4 py-2 rounded-md shadow-md hover:bg-gray-200 transition">
                  <FaFacebook size={20} className="text-blue-600" />
                  <span>Facebook</span>
                </a>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Auth;