import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebaseconfig";

const Login = () => {
  const [email, setemail] = useState("");
  const [motdepasse, setmotdepasse] = useState("");
  const [btn, setbtn] = useState(false);
  const navigate = useNavigate();
  const [msg, setmsg] = useState("");

  useEffect(() => {
    if (motdepasse.length > 5 && email !== "") {
      setbtn(true);
    } else if (btn) {
      setbtn(false);
    }
  }, [motdepasse, email, btn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, motdepasse)
      .then((user) => {
        console.log(user);
        setemail("");
        setmotdepasse("");
        navigate("/welcome", { replace: true });
      })
      .catch((error) => {
        setmsg(error);
      });
  };

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin"></div>
        <div className="formBoxRight">
          <div className="formContent">
            <form onSubmit={handleSubmit}>
              {msg !== "" && <span>{msg.message}</span>}
              <h2>Connexion</h2>
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
              <div className="inputBox">
                <input
                  type="password"
                  onChange={(e) => setmotdepasse(e.target.value)}
                  value={motdepasse}
                  autoComplete="off"
                  required
                />
                <label htmlFor="motdepasse">Mot de passe</label>
              </div>

              {<button disabled={btn ? false : true}>Connexion</button>}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/signup">
                Nouveau sur marvel Quiz? Inscrivez-vous maintenant.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
