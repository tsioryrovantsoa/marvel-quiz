import React, { useEffect, useState } from "react";
import Stepper from "react-stepper-horizontal";

const Levels = ({ levelNames, quizLevel }) => {
  const [level, setlevel] = useState([]);

  useEffect(() => {
    //maper les levels existants
    const quizSteps = levelNames.map((level) => ({
      title: level.toUpperCase(),
    }));
    setlevel(quizSteps);
  }, [levelNames]);

  //miverimberina be dia mampiasa memo
  console.log(level);

  return (
    //steper horizontal
    <div className="levelsContainer" style={{ backgroundColor: "transparent" }}>
      <Stepper
        steps={level}
        activeStep={quizLevel}
        circleTop={0}
        activeTitleColor="#d31017"
        activeColor="#d31017"
        completeTitleColor="#E0E0E0"
        defaultTitleColor="#E0E0E0"
        completeColor="#E0E0E0"
        completeBarColor="#E0E0E0"
      />
    </div>
  );
};

export default React.memo(Levels);
