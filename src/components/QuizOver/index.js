import React, { useEffect, useState } from "react";

const QuizOver = React.forwardRef((props, ref) => {
  const [asked, setasked] = useState([]);
  const {
    levelNames,
    score,
    maxquestion,
    quizLevel,
    percent,
    loadLevelQuestion,
  } = props;
  useEffect(() => {
    setasked(ref.current);
  }, [ref]);

  const moyenne = maxquestion / 2;

  if (score < moyenne) {
    // setTimeout(() => {
    //   loadLevelQuestion(0);
    // }, 3000);
    setTimeout(() => {
      loadLevelQuestion(quizLevel);
    }, 3000);
  }

  const decision =
    score >= moyenne ? (
      <>
        <div className="stepsBtnContainer">
          {quizLevel < levelNames.length ? (
            <>
              <p className="successMsg">Bravo, passer au niveau suivante</p>
              <button
                className="btnResult success"
                onClick={() => {
                  loadLevelQuestion(quizLevel);
                }}
              >
                Niveau suivant
              </button>
            </>
          ) : (
            <>
              <p className="successMsg">Bravo, vous etez expert</p>
              <button
                className="btnResult gameOver"
                onClick={() => {
                  loadLevelQuestion(0);
                }}
              >
                Accueil
              </button>
            </>
          )}
        </div>
        <div className="percentage">
          <div className="progressPercent">Reuissite {percent}%</div>
          <div className="progressPercent">
            Note {score}/{maxquestion}
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="stepsBtnContainer">
          <p className="failureMsg">Vous avez echouer</p>
        </div>
        <div className="percentage">
          <div className="progressPercent">Reuissite {percent}%</div>
          <div className="progressPercent">
            Note {score}/{maxquestion}
          </div>
        </div>
      </>
    );

  const questionanswrs =
    score >= moyenne ? (
      asked.map((question) => {
        return (
          <tr key={question.id}>
            <td>{question.question}</td>
            <td>{question.answer}</td>
            <td>
              <button className="btnInfo">Infos</button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="3">
          <div className="loader"></div>
          <p style={{ textAlign: "center", color: "red" }}>Pas de reponses!</p>
        </td>
      </tr>
    );

  return (
    <>
      {decision}

      <hr />
      <p> Les reponses aux questions poses</p>

      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Reponse</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>{questionanswrs}</tbody>
        </table>
      </div>
    </>
  );
});

export default React.memo(QuizOver);
