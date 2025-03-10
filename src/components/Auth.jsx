import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaUpload, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import successSound from "./success.mp3"; // Import success sound
import failureSound from "./failure.mp3"; // Import failure sound
import Popup from "./Popup";

const Auth = ({setIsLoggedIn}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", rePassword: "", image: null});
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  // const [isOTPSent, setIsOTPSent] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Play success sound
  const playSuccessSound = () => {
    const audio = new Audio(successSound);
    audio.play();
  };

  // Play failure sound
  const playFailureSound = () => {
    const audio = new Audio(failureSound);
    audio.play();
  };

  // Show success popup
  const showSuccessPopup = (message) => {
    setPopupMessage(message);
    setIsSuccess(true);
    setShowPopup(true);
    playSuccessSound(); // Play success sound
    setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
  };

  // Show failure popup
  const showFailurePopup = (message) => {
    setPopupMessage(message);
    setIsSuccess(false);
    setShowPopup(true);
    playFailureSound(); // Play failure sound
    setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
  };

  // Redirect to dashboard if user is logged in
  // useEffect(() => {
  //   if (user) {
  //     navigate("/dashboard/home");
  //   }
  // }, [user, navigate]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
    validateField(name, value);
  };

  // Validate form fields
  const validateField = (name, value) => {
    let newErrors = { ...errors };

    if (name === "password") {
      const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      if (!passwordRegex.test(value)) {
        newErrors.password = "Password must be 8+ chars, include a number, uppercase, special char.";
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

  // Handle sending OTP
  // const handleSendOTP = async () => {
  //   if (!formData.email) {
  //     showFailurePopup("Please enter your email to send OTP.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post("import.meta.env.VITE_BASE_URL/api/auth/send-otp", {
  //       email: formData.email,
  //     });
  //     setIsOTPSent(true); // Mark OTP as sent
  //     showSuccessPopup("OTP sent successfully! Check your email.");
  //   } catch (error) {
  //     showFailurePopup(error.response?.data?.error || "Failed to send OTP.");
  //   }
  // };

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.rePassword) {
      showFailurePopup("Please fill all fields and upload an image.");
      return;
    }
  
    if (formData.password !== formData.rePassword) {
      showFailurePopup("Passwords do not match.");
      return;
    }
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }
  
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL || ""}/api/auth/register`, formDataToSend, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      showSuccessPopup("Signup successful! Please login.");
      setIsLogin(true);
    } catch (error) {
      showFailurePopup(error.response?.data?.error || "Signup failed");
    }
  };
  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      showFailurePopup("Please enter email and password");
      return;
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL||""}/api/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      dispatch(login(data.user)); // Dispatch login action
      localStorage.setItem("token",data.token);
      setIsLoggedIn(true);

      showSuccessPopup("Login successful! Redirecting to dashboard...");
      navigate(`/dashboard/home`);
    } catch (error) {
      showFailurePopup(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-800 px-4">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden mt-16">
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
              className="mt-5 px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition flex items-center space-x-2"
            >
              <FaKey className="inline-block" />
              <span>{isLogin ? "Sign Up" : "Login"}</span>
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
            <h2 className="text-2xl font-semibold text-center mb-5 flex items-center justify-center space-x-2">
              <FaKey className="inline-block" />
              <span>{isLogin ? "Login" : "Sign Up"}</span>
            </h2>
            <form onSubmit={isLogin ? handleLogin : handleSignup} className="flex flex-col space-y-4">
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`border p-2 rounded-md focus:ring-2 focus:ring-blue-500 w-full ${
                    errors.password || shake ? "border-red-500 shake" : ""
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs whitespace-nowrap">{errors.password}</p>}
              {!isLogin && (
                <>
                  <div className="relative">
                    <input
                      type={showRePassword ? "text" : "password"}
                      name="rePassword"
                      placeholder="Re-enter Password"
                      value={formData.rePassword}
                      onChange={handleChange}
                      className={`border p-2 rounded-md focus:ring-2 focus:ring-blue-500 w-full ${
                        errors.rePassword || shake ? "border-red-500 shake" : ""
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowRePassword(!showRePassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    >
                      {showRePassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.rePassword && <p className="text-red-500 text-xs whitespace-nowrap">{errors.rePassword}</p>}
                  <div className="flex space-x-2">
                    {/* <input
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      value={formData.otp}
                      onChange={handleChange}
                      className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500 flex-grow"
                      required
                      disabled={!isOTPSent}
                    /> */}
                    {/* <button
                      type="button"
                      onClick={handleSendOTP}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                      disabled={isOTPSent}
                    >
                      {isOTPSent ? "OTP Sent" : "Send OTP"}
                    </button> */}
                  </div>
                </>
              )}
              {!isLogin && (
                <div className="flex items-center space-x-2">
                  <label htmlFor="image" className="cursor-pointer">
                    <FaUpload className="text-blue-500 text-2xl" />
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
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                </div>
              )}
              <button
                type="submit"
                className="bg-gradient-to-br from-blue-500 to-blue-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition flex items-center justify-center space-x-2"
              >
                <FaKey className="inline-block" />
                <span>{isLogin ? "Login" : "Sign Up"}</span>
              </button>
              <div className="flex justify-center space-x-4 mt-3">
                <a href={`${import.meta.env.VITE_BASE_URL||""}/api/auth/google`} className="flex items-center space-x-2 border px-4 py-2 rounded-md shadow-md hover:bg-gray-200 transition">
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

      {/* Popup at the Top */}
      <Popup show={showPopup} isSuccess={isSuccess} message={popupMessage} />
    </div>
  );
};

export default Auth;