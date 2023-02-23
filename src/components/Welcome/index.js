import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebaseconfig"; 
import Logout from "../Logout";
import Quiz from "../Quiz";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [usersession, setusersession] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const listener = onAuthStateChanged(auth, user => {
      user ? setusersession(user) : navigate('/') 
    })

    return listener();
  }, [])
  

  return usersession == null ? (
    <>
      <div className="loader"></div>
      <p className="loaderText">Loading ...</p>
    </>
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <Logout />
        <Quiz />
      </div>
    </div>
  );
};

export default Welcome;
