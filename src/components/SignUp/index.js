import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebaseconfig";
import { Link, useNavigate } from "react-router-dom";
import { setDoc } from "firebase/firestore";
import { user } from "../Firebase/firebaseconfig";

const SignUp = () => {
  const data = {
    pseudo: "",
    email: "",
    motdepasse: "",
    confirmmotdepasse: "",
  };

  const navigate = useNavigate();

  const [loginData, setloginData] = useState(data);
  const [error, seterror] = useState("");
  // console.log(loginData);

  const handleChange = (e) => {
    console.log(e.target.id);
    console.log(e.target.value);
    setloginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, motdepasse,pseudo } = loginData;
    createUserWithEmailAndPassword(auth, email, motdepasse)
      .then((authUser) => {
        return setDoc(user(authUser.user.uid),{
          pseudo,
          email
        });
      })
      .then((user) => {
        setloginData({ ...data });
        navigate("/welcome");
      })
      .catch((error) => {
        seterror(error);
      });
  };

  const { pseudo, email, motdepasse, confirmmotdepasse } = loginData;

  const btn =
    pseudo === "" ||
    pseudo.indexOf('@') > -1 ||
    email === "" ||
    motdepasse === "" ||
    motdepasse !== confirmmotdepasse ? (
      <button disabled>Inscription</button>
    ) : (
      <button>Inscription</button>
    );

  //error

  const errormsg = error !== "" && <span>{error.message}</span>;

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup"></div>
        <div className="formBoxRight">
          <div className="formContent">
            <form onSubmit={handleSubmit}>
              {errormsg}
              <h2>Inscription</h2>
              <div className="inputBox">
                <input
                  type="text"
                  onChange={handleChange}
                  value={pseudo}
                  id="pseudo"
                  autoComplete="off"
                  required
                />
                <label htmlFor="pseudo">Pseudo</label>
              </div>
              <div className="inputBox">
                <input
                  type="email"
                  onChange={handleChange}
                  value={email}
                  id="email"
                  autoComplete="off"
                  required
                />
                <label htmlFor="email">E-mail</label>
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  onChange={handleChange}
                  value={motdepasse}
                  id="motdepasse"
                  autoComplete="off"
                  required
                />
                <label htmlFor="motdepasse">Mot de passe</label>
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  onChange={handleChange}
                  value={confirmmotdepasse}
                  id="confirmmotdepasse"
                  autoComplete="off"
                  required
                />
                <label htmlFor="confirmmotdepasse">
                  Confirmer le mot de passe
                </label>
              </div>
              {btn}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Deja inscrit? Connetez-vous
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
