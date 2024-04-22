import React, { useState, useEffect } from "react";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext.jsx";
import { db } from "../../../../firebase.js";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const UserDetails = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();
  const [userData, setUserData] = useState({
    username: "",
    role: "",
    theme: "",
    photoURL: "",
    fullName: "",
    location: "",
    covidSupport: false,
    specialization: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        try {
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserData({
              username: userDocSnap.data().username,
              role: userDocSnap.data().role,
              theme: userDocSnap.data().theme,
              photoURL: userDocSnap.data().photoURL,
              fullName: userDocSnap.data().name,
              location: userDocSnap.data().location,
              covidSupport: userDocSnap.data().covid_support,
              specialization: userDocSnap.data().specialization,
              // insurance: userDocSnap.data().insurance,
            });
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserInfo();
  }, [user]);

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name != "role" && name != "email") {
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
    } else {
      enqueueSnackbar(`This cannot be changed`, {
        variant: "error",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // You'll need to ensure you have a document reference for the current user
      // const userDocRef = doc(db, "users", user.uid);
      // await updateDoc(userDocRef, {
      //   ...userData,
      // });
      const roleDocRef = doc(db, userData.role, user.uid);
      await updateDoc(roleDocRef, {
        ...userData,
      });
      enqueueSnackbar(`Profile succesfully updated`, {
        variant: "success",
      });
    } catch (error) {
      console.error("Error updating user details:", error);
      enqueueSnackbar(`Failed to update profile deatils: ${error.message}`, {
        variant: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg">
        <div className="mb-6 text-center">
          <div className="flex justify-center">
            {/* <span className="text-[#747264] text-4xl">👨‍🦱</span> */}
            <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
              <img
                src={userData.photoURL}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 my-4">
            Your Profile Details
          </h2>
          {/* {/* <p className="text-gray-600">
            Need to make an account?{" "}
            <a href="/register" className="text-[#747264] hover:underline">
              Register
            </a>
          </p> */}
          <p className="text-gray-600">
            Want to return to the dashboard?{" "}
            <a
              onClick={() => {
                navigate(
                  `/${
                    userData.role == "patient"
                      ? "client"
                      : userData.role == "doctor"
                      ? "doctor"
                      : "provider"
                  }`
                );
              }}
              className="text-[#747264] hover:underline hover:cursor-pointer"
            >
              Go Back
            </a>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            //placeholder="Email address"
            //onChange={handleChange}
            value={user && user.email}
            className="w-full p-4 border rounded-lg hover:cursor-not-allowed italic bg-gray-50 border-gray-300 focus:ring-[#747264] focus:border-[#747264]"
            required
          />
          <input
            type="username"
            name="username"
            //placeholder="username"
            onChange={handleInputChange}
            value={user && userData.username}
            className="w-full p-4 border rounded-lg bg-gray-50 border-gray-300 focus:ring-[#747264] focus:border-[#747264]"
            required
          />
          <select
            name="role"
            onChange={handleInputChange}
            value={user && userData.role}
            className="w-full p-4 border hover:cursor-not-allowed italic disabled rounded-lg bg-gray-50 border-gray-300 focus:ring-[#747264] focus:border-[#747264]"
            required
          >
            <option value="" disabled>
              Your Role
            </option>
            <option value="patient">Role: Patient</option>
            <option value="doctor">Role: Doctor</option>
            <option value="insuranceProvider">Role: Insurance Provider</option>
          </select>
          {userData.role === "doctor" && (
            <>
              <input
                type="fullName"
                name="fullName"
                placeholder="Your Full Name"
                onChange={handleInputChange}
                value={user && userData.fullName}
                className="w-full p-4 border rounded-lg bg-gray-50 border-gray-300 focus:ring-[#747264] focus:border-[#747264]"
                required
              />
              <input
                type="location"
                name="location"
                placeholder="location"
                onChange={handleInputChange}
                value={user && userData.location}
                className="w-full p-4 border rounded-lg bg-gray-50 border-gray-300 focus:ring-[#747264] focus:border-[#747264]"
                required
              />
              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                onChange={handleInputChange}
                value={userData.specialization}
                className="w-full p-4 border rounded-lg bg-gray-50 border-gray-300 focus:ring-[#747264] focus:border-[#747264]"
                required={userData.role === "doctor"}
              />
              <input
                type="checkbox"
                name="covidSupport"
                onChange={(e) =>
                  setUserData({ ...userData, covidSupport: e.target.checked })
                }
                checked={userData.covidSupport}
              />{" "}
              <label htmlFor="covidSupport">
                {" "}
                Do you provide Covid Support?
              </label>
            </>
          )}
          <select
            name="theme"
            onChange={handleInputChange}
            value={user && userData.theme}
            className="w-full p-4 border rounded-lg bg-gray-50 border-gray-300 focus:ring-[#747264] focus:border-[#747264]"
            required
          >
            <option value="" disabled>
              Select your theme
            </option>
            <option value="default">Theme: Default</option>
            <option value="alternate">Theme: Alternate</option>
          </select>

          <button
            type="submit"
            className="w-full p-4 bg-[#747264] text-white rounded-lg hover:bg-[#3C3633]"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

// const DoctorFormFields = () => (

// );

export default UserDetails;
