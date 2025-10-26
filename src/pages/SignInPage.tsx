import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ArrowLeft, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function SignInPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create user data and log them in
    const userData = {
      id: Date.now().toString(), // Simple ID generation
      fullName: "User", // Default name for sign in
      email: formData.email,
    };
    login(userData);
    navigate('/home');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden antialiased">
      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(168,85,247,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.02)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none"></div>
      
      {/* Vignette Effect */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none"></div>

      {/* Animated Background Orbs */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fuchsia-600 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </motion.div>

          {/* Form Container */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 rounded-3xl blur-2xl opacity-20"></div>
            
            {/* Main form container */}
            <div className="relative bg-gradient-to-br from-purple-500/10 via-transparent to-fuchsia-500/10 backdrop-blur-3xl border border-purple-500/30 rounded-3xl p-8 shadow-2xl">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center mb-8"
              >
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                <p className="text-gray-400">Sign in to continue your learning journey</p>
              </motion.div>

              {/* Form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 px-3">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-4 text-gray-500 flex-shrink-0" />
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="px-6 bg-black/40 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500/50 focus:ring-purple-500/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
  <label className="text-sm font-medium text-gray-300 px-3">Password</label>

  <div className="flex items-center gap-2">
    {/* 1. Use flex-grow instead of w-full */}
    <div className="relative flex-grow">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-4 text-gray-500 flex-shrink-0" />
      <Input
        type={showPassword ? "text" : "password"}
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Create a password"
        className="w-full px-6 bg-black/40 border-purple-500/30 text-white placeholder-gray-500 focus:border-purple-500/50 focus:ring-purple-500/50"
        required
      />
    </div>

    {/* This button will now be visible */}
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="text-gray-500 hover:text-white transition-colors flex-shrink-0"
    >
      {showPassword ? <Eye className="w-5 h-4" /> : <EyeOff className="w-5 h-4" />}
    </button>
  </div>
</div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-600 hover:from-purple-500 hover:via-purple-400 hover:to-fuchsia-500 text-white font-bold shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 group relative overflow-hidden h-12"
                >
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Button>
              </motion.form>

              {/* Sign Up Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center mt-6"
              >
                <p className="text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
