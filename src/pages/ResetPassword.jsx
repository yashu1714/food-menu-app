import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!email) return alert("Please enter your email");

    try {
      await sendPasswordResetEmail(auth, email);
  toast.info("Password reset email sent!");
      navigate("/login");
    } catch (error) {
    toast.error(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>

      <input
        type="email"
        placeholder="Enter your registered email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleReset}>Send Reset Email</button>

      <button onClick={() => navigate("/login")}>
        ← Back to Login
      </button>
    </div>
  );
};

export default ResetPassword;
