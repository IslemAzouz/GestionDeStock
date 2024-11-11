import React, { useState } from "react";
import Login from "../assets/Login page.png";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user agreed to the terms and conditions
    if (!formData.agreeTerms) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    // Make the POST request to the backend
    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.created) {
        // Handle success (e.g., show a success message or redirect)
        alert("Registration successful!");
        // Redirect to the login page after successful registration
        window.location.href = "/login";
      } else {
        // Handle errors
        console.log(data.errors);
        alert("Error during registration. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="h-screen flex">
      {/* Left Side: Illustration */}
      <div className="hidden lg:flex w-1/2 bg-gray-100 justify-center items-center">
        <img
          src={Login}
          alt="register image page"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold mb-4">Register</h2>
          <p className="text-gray-600 mb-8">
            Manage all your inventory efficiently. Let’s get you all set up so
            you can verify your personal account and begin setting up your work
            profile.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name and Last Name */}
            <div className="flex space-x-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className="w-1/2 p-3 border border-gray-300 rounded-md"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className="w-1/2 p-3 border border-gray-300 rounded-md"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email and Phone */}
            <div className="flex space-x-4">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-1/2 p-3 border border-gray-300 rounded-md"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone no."
                className="w-1/2 p-3 border border-gray-300 rounded-md"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-gray-600">
                I agree to all terms, privacy policies, and fees
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 transition"
            >
              Sign up
            </button>

            {/* Login Link */}
            <p className="text-gray-600 mt-4 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
