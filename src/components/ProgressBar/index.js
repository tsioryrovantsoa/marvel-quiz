import React from "react";

//parametre en fonction question a present et question maximum
const ProgressBar = ({ idquestion, maxQuestion }) => {
  // pourcentage = idquestion * (100/total de question)
  const getporcent = (idquest, total) => {
    return (100 / total) * idquest;
  };

  // question actuel car idquestion debute a  l'ID 0
  const actualquestion = idquestion + 1;
  // progression est donc egale a
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
