import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebaseconfig";
import { useNavigate } from "react-router-dom";


const Logout = () => {
  const [checked, setchecked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (checked) {
      //Deconnexion
      signOut(auth).then(() => {
        //vous etes deconnecter
        setTimeout(() => {
            navigate('/');
        },1000)
      }).catch((error)=>{
        //erreur
      })
    }
  }, [checked]);

  const handleChange = (e) => {
    setchecked(e.target.checked);
  };

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input onChange={handleChange} type="checkbox" checked={checked} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Logout;
