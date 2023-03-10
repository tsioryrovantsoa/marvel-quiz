import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebaseconfig";
import { useNavigate } from "react-router-dom";
import {Tooltip}  from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';


const Logout = () => {
  const [checked, setchecked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // si le bouton est chequer
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
    //sinon rien
  }, [checked,navigate]);

  // quand checked le bouton executer ceci
  const handleChange = (e) => {
    setchecked(e.target.checked);
  };

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input onChange={handleChange} type="checkbox" checked={checked} />
        <span className="slider round" data-tooltip-id="my-tooltip" data-tooltip-content="Deconnexion" ></span>
        <Tooltip id="my-tooltip" place="left"/>
      </label>
    </div>
  );
};

export default Logout;
