import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../utils/mutation";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [signupUser, { loading, error }] = useMutation(SIGNUP_USER);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    // Call the signupUser mutation with the form data
    signupUser({
      variables: {
        username,
        email,
        password,
      },
    })
      .then((response) => {
        console.log("User registered successfully:", response.data);
        // Optionally, redirect the user to the login page or dashboard
        // history.push("/login");
      })
      .catch((error) => {
        console.error("User registration failed:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          Sign Up
        </button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default Signup;
