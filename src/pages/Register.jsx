import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Validation schema
const schema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const Register = () => {
  const { backendUrl, setToken, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur", // Validate on blur
  });

  const onSubmitHandler = async (formData) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        toast.success("Account created successfully!");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center py-12">
      <motion.div
        className="relative bg-white p-8 md:p-10 rounded-2xl shadow-2xl max-w-md w-full mx-4"
        initial={{ opacity: 0.2, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
          <p className="text-sm text-gray-500 mt-2">
            Join ImageCraft to unleash your creative potential
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
          <div className="relative">
            <div className="absolute left-3 top-6 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              {...register("name")}
              className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-lg outline-none transition-colors ${
                errors.name
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-blue-500"
              }`}
              type="text"
              placeholder="Full Name"
            />
            {errors.name && (
              <p className="mt-1 text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          <div className="relative">
            <div className="absolute left-3 top-6 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input
              {...register("email")}
              className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-lg outline-none transition-colors ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-blue-500"
              }`}
              type="email"
              placeholder="Email address"
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-xs">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <div className="absolute left-3 top-6 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              {...register("password")}
              className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-lg outline-none transition-colors ${
                errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-blue-500"
              }`}
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className="mt-1 text-red-500 text-xs">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="relative">
            <div className="absolute left-3 top-6 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              {...register("confirmPassword")}
              className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-lg outline-none transition-colors ${
                errors.confirmPassword
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-blue-500"
              }`}
              type="password"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="mt-2">
            <p className="text-xs text-gray-500">
              By creating an account, you agree to our{" "}
              <Link to="#" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center disabled:opacity-70"
          >
            {isSubmitting ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : null}
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="ml-1 text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
