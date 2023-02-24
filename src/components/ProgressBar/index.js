import React from "react";

const ProgressBar = () => {
  return (
    <>
      <div className="percentage">
        <div className="progressPercent">Questions 1/10</div>
        <div className="progressPercent">Progression : 10%</div>
      </div>
      <div className="progressBar">
        <div className="progressBarChange" style={{ width: "10%" }}></div>
      </div>
    </>
  );
};

export default ProgressBar;
