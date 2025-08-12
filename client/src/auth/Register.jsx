import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import { Link } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register({ name, email, password });
    navigate("/login");
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