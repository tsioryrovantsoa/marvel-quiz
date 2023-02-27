import React, { useEffect, useState } from "react";

const QuizOver = React.forwardRef((props, ref) => {
  const [asked, setasked] = useState([]);
  useEffect(() => {
    setasked(ref.current);
  }, [ref]);

  const questionanswrs = asked.map((question) => {
    return (
      <tr key={question.id}>
        <td>{question.question}</td>
        <td>{question.answer}</td>
        <td>
          <button className="btnInfo">Infos</button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="stepsBtnContainer">
        <p className="successMsg">Bravo, tres bien</p>
        <button className="btnResult success">Niveau suivant</button>
      </div>
      <div className="percentage">
        <div className="progressPercent">Reuissite 10%</div>
        <div className="progressPercent">Note 10/10</div>
      </div>
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
          <tbody>
            {questionanswrs}
          </tbody>
        </table>
      </div>
    </>
  );
});

export default React.memo(QuizOver);
