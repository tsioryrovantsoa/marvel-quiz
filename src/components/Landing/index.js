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
        <button className="btn-welcome">Inscription</button>
      </div>
      <div onMouseOver={setrightimage} onMouseOut={clearimage} className="rightBox">
        <button className="btn-welcome">Connexion</button>
      </div>
    </>
  );

  return <main ref={refwolverine} className="welcomePage">{boutton}</main>;
};

export default Landing;
