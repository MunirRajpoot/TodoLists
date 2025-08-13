import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import { Link } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Password regex validation (same as backend)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{8,}$/;
    if (!passwordRegex.test(password)) {
      setIsLoading(false);
      const msg =
        "Password must be at least 8 characters long, include uppercase, lowercase, number, special character, and must not contain spaces.";
      setError(msg);
      toast.error(msg);
      return;
    }

    try {
      // Send plain password (HTTPS encrypts during transmission)
      const { data } = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", data.token);

      // Save user in localStorage
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const additionalFields = [
    {
      id: "name",
      name: "name",
      label: "Name",
      value: name,
      onChange: (e) => setName(e.target.value),
      required: true,
    },
  ];

  return (
    <AuthForm
      title="Create an account"
      onSubmit={handleSubmit}
      additionalFields={additionalFields}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      submitButtonText="Create Account"
      footerText="Already have an account?"
      footerLinkText="Log In"
      footerLinkPath="/login"
      isLoading={isLoading}
      error={error}
      checkboxText={
        <>
          I agree to the{" "}
          <Link href="#" sx={{ color: "#9c6cff" }}>
            Terms & Conditions
          </Link>
        </>
      }
    />
  );
};

export default Register;
