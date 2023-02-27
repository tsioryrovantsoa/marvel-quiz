import React from "react";

const ProgressBar = ({ idquestion, maxQuestion }) => {
  const getporcent = (idquest, total) => {
    return (100 / total) * idquest;
  };

  const actualquestion = idquestion + 1;
  const progess = getporcent(actualquestion, maxQuestion);

  return (
    <>
      <div className="percentage">
        <div className="progressPercent">
          Questions {idquestion + 1}/{maxQuestion}
        </div>
        <div className="progressPercent">Progression : {`${progess} %`}</div>
      </div>
      <div className="progressBar">
        <div
          className="progressBarChange"
          style={{ width: `${progess}%` }}
        ></div>
      </div>
    </>
  );
};

//Rechargement inutile
export default React.memo(ProgressBar);
