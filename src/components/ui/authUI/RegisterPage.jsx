import React, { useState } from "react";
import { auth } from "../../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { db, getStorageRef } from "../../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const SignupForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { registerUser } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [error, setError] = useState(null);

  const [file, setFile] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    let photoURL;
    if (file) {
      const fileRef = getStorageRef(`profilePictures/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      photoURL = await getDownloadURL(snapshot.ref);
    }

    try {
      setError(null);

      await registerUser(
        formData.email,
        formData.password,
        formData.role,
        formData.username,
        photoURL ? photoURL : ""
      );

      enqueueSnackbar(`User succesfully created!`, {
        variant: "success",
      });

      if (formData.role === "patient") {
        navigate("/client");
      } else if (formData.role === "doctor") {
        navigate("/doctor");
      } else if (formData.role === "insuranceProvider") {
        navigate("/provider");
      }
    } catch (error) {
      enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg">
        <div className="mb-6 text-center">
          <div className="flex justify-center">
            <span className="text-[#747264] text-4xl">⚕</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 my-4">
            Signup to create an account
          </h2>
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-[#747264] hover:underline">
              Login
            </a>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={formData.username}
            className="w-full p-4 border rounded-lg bg-gray-50 border-gray-300 focus:ring-[#747264] focus:border-[#747264]"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleChange}
            value={formData.email}
            className="w-full p-4 border rounded-lg bg-gray-50 border-gray-300 focus:ring-[#747264] focus:border-[#747264]"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            className="w-full p-4 border rounded-lg bg-gray-50 border-gray-300 focus:ring-[#747264] focus:border-[#747264]"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={formData.confirmPassword}
            className="w-full p-4 border rounded-lg bg-gray-50 border-gray-300 focus:ring-[#747264] focus:border-[#747264]"
            required
          />

          <select
            name="role"
            onChange={handleChange}
            value={formData.role}
            className="w-full p-4 border rounded-lg bg-gray-50 border-gray-300 focus:ring-[#747264] focus:border-[#747264]"
            required
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="insuranceProvider">Insurance Provider</option>
          </select>
          <div>
            <label htmlFor="profilePicture">Profile Picture:</label>
            <input
              id="profilePicture"
              type="file"
              name="profilePicture"
              onChange={handleImageChange}
              className="w-full p-4 border rounded-lg bg-gray-50 border-gray-300 focus:ring-[#747264] focus:border-[#747264]"
            />
          </div>

          <button
            type="submit"
            className="w-full p-4 bg-[#747264] text-white rounded-lg hover:bg-[#3C3633]"
          >
            Signup
          </button>
        </form>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SignupForm;
