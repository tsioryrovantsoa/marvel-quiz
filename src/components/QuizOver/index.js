import React, { useEffect, useState } from "react";
import { GiTrophyCup } from "react-icons/gi";
import Loader from "../Loader";
import Modal from "../Modal";

const QuizOver = React.forwardRef((props, ref) => {
  const [asked, setasked] = useState([]);
  const [open, setopen] = useState(false);
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

  const showModal = (id) => {
    setopen(true);
  }

  const hideModal = () => {
    setopen(false);
  }

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
              <p className="successMsg">
                <GiTrophyCup size="50px" /> Bravo, vous etez expert
              </p>
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
              <button className="btnInfo" onClick={() => showModal(question.heroId)}>Infos</button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="3">
          <Loader loadingmsg="Pas de reponses" styling={{textAlign: "center", color: "red" }}/>
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

      <Modal showModal={open} hideModal={hideModal}>
          <div className="modalHeader">
            <h2>Tutre </h2>
          </div>
          <div className="modalBody">
            <h3>Tutre 2</h3>
          </div>
          <div className="modalFooter">
            <button className="modalBtn">Fermer</button>
        </div>
      </Modal>
    </>
  );
});

export default React.memo(QuizOver);
