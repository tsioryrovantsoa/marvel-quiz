import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebaseconfig";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgetPassword = () => {
  const [email, setemail] = useState("");
  const [success, setsuccess] = useState(null);
  const [error, seterror] = useState(null);

  const navigate = useNavigate;

  //formulaire valider
  const handleSubmit = (e) => {
    //don't recharge la page
    e.preventDefault();

    //appelle a firebase en passant la connexion depuis firebase config, et le email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        //si email evoyer
        seterror(null);
        setsuccess(
          `Consultez votre e-mail ${email} pour modifier le mot de passe`
        );
        setemail("");
        //naviger apres 5 secondes
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      })
      .catch((error) => {
        //sinon mettez l'erreur dans le state
        seterror(error);
      });
  };
  //bouton non activer si email est vide
  const disabled = email === "";
  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {/* afficher message selon la valeur de success ou error*/}
            {success && (
              <span
                style={{
                  border: "1px solid green",
                  background: "green",
                  color: "white",
                }}
              >
                {success}
              </span>
            )}
            {error && <span>{error.message}</span>}

            <form onSubmit={handleSubmit}>
              <h2>Mot de passe oublie ?</h2>
              <div className="inputBox">
                <input
                  type="email"
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                  autoComplete="off"
                  required
                />
                <label htmlFor="email">E-mail</label>
              </div>
              <button disabled={disabled}>Recuperer</button>
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Connectez-vous ici.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
