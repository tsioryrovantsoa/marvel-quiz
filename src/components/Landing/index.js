import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Landing = () => {
  const [btn, setbtn] = useState(false);
  //modifier la photo en fonction des clicks
  const refwolverine = useRef(null);
  // console.log(refwolverine);

  useEffect(() => {
    // par default ajouter class startingImg
    refwolverine.current.classList.add("startingImg");

    //apress 1seconde 
    // enlever le class startingImg
    setTimeout(() => {
      refwolverine.current.classList.remove("startingImg");
      setbtn(true);
    }, 1000);
  }, []);
  //une fois executer au moment du montage uniquement

  //executer onMouse Over left
  const setleftimage = () => {
    refwolverine.current.classList.add("leftImg");
  };
  //executer onMouse Over right
  const setrightimage = () => {
    refwolverine.current.classList.add("rightImg");
  };

  //effacer l'animation quand le souris n'est pas la
  const clearimage = () => {
    if (refwolverine.current.classList.contains("leftImg")) {
      refwolverine.current.classList.remove("leftImg");
    } else if (refwolverine.current.classList.contains("rightImg")) {
      refwolverine.current.classList.remove("rightImg");
    }
  };

  const boutton = btn && (
    <>
      <div
        onMouseOver={setleftimage}
        onMouseOut={clearimage}
        className="leftBox"
      >
        <Link className="btn-welcome" to="/signup">
          Inscription
        </Link>
      </div>
      <div
        onMouseOver={setrightimage}
        onMouseOut={clearimage}
        className="rightBox"
      >
        <Link className="btn-welcome" to="/login">
          Connexion
        </Link>
      </div>
    </>
  );

  return (
    <main ref={refwolverine} className="welcomePage">
      {boutton}
    </main>
  );
};

export default Landing;
