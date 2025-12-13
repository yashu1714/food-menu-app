import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      toast.success("Please enter both email and password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Login failed!");
    }
  };
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
   toast.success("Logged in with Google!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      {/* Email */}
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Login Button */}
      <button onClick={handleLogin}>Login</button>

   <button
  onClick={handleGoogleLogin}
  className="google-btn"
>
  <img
    src="https://developers.google.com/identity/images/g-logo.png"
    alt="Google Logo"
    style={{ width: "20px" }}
  />
  Continue with Google
</button>
      {/* Create Account */}
      <button onClick={() => navigate("/create")}>
        Need an account? Create one
      </button>
      {/* Forgot Password */}
      <button onClick={() => navigate("/reset")}>
        Forgot Password?
      </button>
      {/* Back Home */}
      <button onClick={() => navigate("/")}>← Back to Home</button>
    </div>
  );
};

export default Login;
