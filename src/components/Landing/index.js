import React, { useRef, useEffect, useState } from "react";

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

  const boutton = btn && (
    <>
      <div className="leftBox">
        <button className="btn-welcome">Inscription</button>
      </div>
      <div className="rightBox">
        <button className="btn-welcome">Connexion</button>
      </div>
    </>
  );

  return <main ref={refwolverine} className="welcomePage">{boutton}</main>;
};

export default Landing;
