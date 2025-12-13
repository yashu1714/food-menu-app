import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!email || !password) return toast.error("Please enter email & password");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
  toast.success("Account created successfully!");
      navigate("/login"); // after signup go to login page
    } catch (error) {
     toast.error(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password (min 6 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>Create Account</button>
      <button onClick={() => navigate("/login")}>Already have an account? Login</button>
      <button onClick={() => navigate("/")}>← Back to Home</button>
    </div>
  );
};

export default CreateAccount;

