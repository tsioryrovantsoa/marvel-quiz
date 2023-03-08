import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, user } from "../Firebase/firebaseconfig";
import Logout from "../Logout";
import Quiz from "../Quiz";
import { getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const Welcome = () => {
  const [usersession, setusersession] = useState(null);
  const [userData, setuserData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      user ? setusersession(user) : navigate("/");
    });

    if (usersession !== null) {
      const colref = user(usersession.uid);
      getDoc(colref)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const myData = snapshot.data();
            setuserData(myData);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return listener();
  }, [usersession]);

  return usersession == null ? (
<Loader loadingmsg="Authentification" styling={{ textAlign:'center',color:'white' }}/>
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <Logout />
        <Quiz userData={userData} />
      </div>
    </div>
  );
};

export default Welcome;
