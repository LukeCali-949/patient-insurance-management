import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "../../../firebase.js";

import doctor from "./homepage/doctor.jpg";
import "./App.css";
import Calender from "./homepage/calender.jsx";
import MessageList from "./message/messageList.jsx";
import SendMessageForm from "./message/sendMessageForm.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { db } from "../../../firebase.js";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import MainSearch from "./search/MainSearch.jsx";

function Home() {
  return (
    <div className="home">
      <h1>Welcome to the Doctor central page</h1>
      <div className="page-content">
        <Calender />
        <img src={doctor} alt="doctor" />
      </div>
    </div>
  );
}

function Message() {
  return (
    <div className="message">
      <div className="message-header">
        <h1>Messages</h1>
        <MessageList />
      </div>
      <div className="message-send">
        <SendMessageForm />
      </div>
    </div>
  );
}

function Search() {
  return <MainSearch />;
}

function DoctorApp() {
  const navigate = useNavigate();

  const { user, logOut } = useAuth();

  const [userInfo, setUserInfo] = useState({ username: "", role: "" });

  const handleSignOut = () => {
    logOut();
    navigate("/");
  };

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        try {
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserInfo({
              username: userDocSnap.data().username,
              role: userDocSnap.data().role,
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

  useEffect(() => {
    const handleSignInWithEmailLink = async () => {
      // Check if the URL is a sign-in with email link.
      let email = window.localStorage.getItem("emailForSignIn");
      let username = window.localStorage.getItem("username");
      let role = window.localStorage.getItem("role");
      let photoURL = window.localStorage.getItem("photoURL");
      if (isSignInWithEmailLink(auth, window.location.href)) {
        if (!email) {
          email = window.prompt("Please provide your email for confirmation");
        }

        try {
          const result = await signInWithEmailLink(
            auth,
            email,
            window.location.href
          );

          const user = result.user;

          const userDocRef = doc(db, "users", user.uid);
          await setDoc(userDocRef, {
            email: user.email,
            username: username,
            lastSignIn: serverTimestamp(),
            role: role,
            theme: "default",
            photoURL: photoURL,
          });

          const roleDocRef = doc(db, role, user.uid);
          await setDoc(roleDocRef, {
            email: user.email,
            username: username,
            // role: role,
            // theme: "default",
            photoURL: photoURL,
          });

          window.localStorage.removeItem("emailForSignIn"); // Clear the email from localStorage

          // Update state or context with the signed-in user
          //console.log("User signed in:", result.user);

          // Optionally redirect or update UI
          //navigate("/"); // Modify as necessary
        } catch (error) {
          console.error("Error during sign in with email link:", error);
          //navigate("/login");
        }
      } else {
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          email: user.email,
          username: username,
          lastSignIn: serverTimestamp(),
          role: role,
          theme: "default",
          photoURL: photoURL,
        });
      }
    };

    handleSignInWithEmailLink();
  }, []);

  return (
    <div className="App">
      <header
        className={`${
          userInfo.theme == "default"
            ? "bg-red-600"
            : userInfo.theme == "alternate"
            ? "bg-blue-600"
            : "bg-red-600"
        }`}
      >
        <div className="flex">
          <div className="ml-10">
            <h1>MediApp</h1>
            <nav>
              <ul>
                <li>
                  <Link to="">Home</Link>
                </li>
                <li>
                  <Link to="message">Messages</Link>
                </li>
                <li>
                  <Link to="chatbot">Chatbot</Link>
                </li>
                <li>
                  <Link to="search">Search</Link>
                </li>
              </ul>
            </nav>

            {/* <div className="logout">
            <a href="/">Logout</a>
          </div> */}
          </div>
          <div className="flex mr-10 ml-auto gap-5 w-auto">
            <div
              onClick={() => navigate("/profile-details")}
              className="h-10 w-auto px-5  font-semibold   flex items-center justify-center rounded-lg bg-black  hover:cursor-pointer"
            >
              <h1 className="text-white  text-center  ">
                Your Profile Details
              </h1>
            </div>
            {/* <div className="h-10 w-auto px-5 bg-white   flex items-center justify-center">
              <h1 className="text-black text-center ">
                Email: {user && user.email}
              </h1>
            </div>
            <div className="h-10 w-auto px-5 bg-white flex items-center justify-center  ">
              <h1 className="text-black text-center ">
                Username: {userInfo.username}
              </h1>
            </div>
            <div className="h-10 w-auto px-5 bg-white  flex items-center justify-center ">
              <h1 className="text-black ">Role: {userInfo.role}</h1>
            </div> */}
            <div className="h-10 w-20 rounded-lg bg-white flex items-center justify-center hover:bg-gray-300 cursor-pointer">
              <button
                className="text-black font-semibold"
                onClick={handleSignOut}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      <section className="hero">
        <div className="container">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="message" element={<Message />} />
            <Route path="search" element={<Search />} />
          </Routes>
        </div>
      </section>
      <footer>
        <div className="container">
          <p>&copy; 2024 Insurance Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default DoctorApp;
