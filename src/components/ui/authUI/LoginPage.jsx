import { validateCaptcha } from "react-simple-captcha";

import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import CaptchaTest from "./CaptchaTest";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../../../../firebase";
//import { collection } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, getStorageRef } from "../../../../firebase";

const LoginForm = () => {
  const { signIn, resetPassword } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [userCaptcha, setUserCaptcha] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(formData.email);
      enqueueSnackbar("Check your email for password reset instructions", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(`Failed to reset password: ${error.message}`, {
        variant: "error",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCaptcha(userCaptcha)) {
      enqueueSnackbar(`CAPTCHA was incorrect`, {
        variant: "error",
      });
      return;
    }

    try {
      //const userWithRole = await signIn(formData.email, formData.password);

      const { role, password } = await fetchRoleByEmail(formData.email);

      if (password !== formData.password) {
        enqueueSnackbar(`Incorrect password`, {
          variant: "error",
        });
        return;
      }

      const actionCodeSettings = {
        url: `http://localhost:5173/${role}`,
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, formData.email, actionCodeSettings);
      enqueueSnackbar("Email Sent!", { variant: "success" });
      window.localStorage.setItem("emailForSignIn", formData.email);
      window.localStorage.setItem("cameFromLogin", true);

      // switch (userWithRole.role) {
      //   case "doctor":
      //     navigate(
      //       "/Patient-and-Health-Insurance-Management-System-Group20-Frontend1/doctor"
      //     );
      //     break;
      //   case "patient":
      //     navigate(
      //       "/Patient-and-Health-Insurance-Management-System-Group20-Frontend1/client"
      //     );
      //     break;
      //   case "insuranceProvider":
      //     navigate(
      //       "/Patient-and-Health-Insurance-Management-System-Group20-Frontend1/provider"
      //     );
      //     break;
      // }
    } catch (error) {
      enqueueSnackbar(`Failed to sign in: ${error.message}`, {
        variant: "error",
      });
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
            Login to view your dashboard
          </h2>
          <p className="text-gray-600">
            Need to make an account?{" "}
            <a href="/register" className="text-[#747264] hover:underline">
              Register
            </a>
          </p>
          <p className="text-gray-600">
            Forgot your password?{" "}
            <a
              onClick={handleResetPassword}
              className="text-[#747264] hover:underline hover:cursor-pointer"
            >
              Reset Your Password
            </a>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <CaptchaTest
            setUserCaptcha={setUserCaptcha}
            userCaptcha={userCaptcha}
          />

          <button
            type="submit"
            className="w-full p-4 bg-[#747264] text-white rounded-lg hover:bg-[#3C3633]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const fetchRoleByEmail = async (email) => {
  try {
    // Create a query to find the document with the specified email
    const passwordsCollection = collection(db, "roles");
    const emailQuery = query(passwordsCollection, where("email", "==", email));

    // Execute the query and get the documents
    const querySnapshot = await getDocs(emailQuery);

    if (!querySnapshot.empty) {
      // Get the first document that matches the query
      const doc = querySnapshot.docs[0];
      const passwordData = doc.data();
      const roleValue = passwordData.role;
      const passwordValue = passwordData.password;

      return { role: roleValue, password: passwordValue };
    } else {
      throw new Error("No role found for this email.");
    }
  } catch (error) {
    console.error("Error fetching role:", error);
    throw error; // Propagate the error for further handling
  }
};

export default LoginForm;
