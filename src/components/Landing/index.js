import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Landing = () => {
  const [btn, setbtn] = useState(false);
  const refwolverine = useRef(null);
  // console.log(refwolverine);

  useEffect(() => {
    refwolverine.current.classList.add("startingImg");

    setTimeout(() => {
      refwolverine.current.classList.remove("startingImg");
      setbtn(true);
    }, 1000);
  }, []);
  //une fois executer au moment du montage uniquement

  const setleftimage = () => {
    refwolverine.current.classList.add("leftImg");
  }

  const setrightimage = () => {
    refwolverine.current.classList.add("rightImg");
  }

  const clearimage = () => {
    if(refwolverine.current.classList.contains("leftImg")){
      refwolverine.current.classList.remove("leftImg");
    }else if( refwolverine.current.classList.contains("rightImg")){
      refwolverine.current.classList.remove("rightImg");
    }
  }

  const boutton = btn && (
    <>
      <div onMouseOver={setleftimage} onMouseOut={clearimage} className="leftBox">
        <Link className="btn-welcome" to="/signup">Inscription</Link>
      </div>
      <div onMouseOver={setrightimage} onMouseOut={clearimage} className="rightBox">
        <Link className="btn-welcome" to="/login">Connexion</Link>
      </div>
    </>
  );

  return <main ref={refwolverine} className="welcomePage">{boutton}</main>;
};

export default Landing;
