import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "./axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-amber-100"
      >
        <h2 className="text-3xl font-bold text-amber-900 text-center mb-8">
          Welcome Back
        </h2>

        <div className="mb-6">
          <label className="block text-amber-700 text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-8 relative">
          <label className="block text-amber-700 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all pr-12"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-11 text-amber-600 hover:text-amber-700 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Sign In"
          )}
        </button>

        <p className="text-center mt-6 text-amber-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-semibold text-amber-800 hover:text-amber-900 underline"
          >
            Create account
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
