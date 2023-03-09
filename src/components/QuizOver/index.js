import React, { useEffect, useState } from "react";
import { GiTrophyCup } from "react-icons/gi";
import Loader from "../Loader";
import Modal from "../Modal";
import axios from 'axios';

const QuizOver = React.forwardRef((props, ref) => {
  const [asked, setasked] = useState([]);
  const [open, setopen] = useState(false);
  const [characterInfo, setcharacterInfo] = useState([]);
  const [loading, setisLoading] = useState(true);

  const {
    levelNames,
    score,
    maxquestion,
    quizLevel,
    percent,
    loadLevelQuestion,
  } = props;

  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
  // console.log(API_PUBLIC_KEY);
  // const hash = process.env.HASH;

  useEffect(() => {
    setasked(ref.current);

    if(localStorage.getItem('marvelDateStorage')){
      const date = localStorage.getItem('marvelDateStorage');
      checkDataAge(date);
    }

  }, [ref]);

  const checkDataAge = date => {

    const today = Date.now();
    const differencetime = today - date;

    const differencedays = differencetime / (1000 * 3600 * 24);

    if(differencedays >= 15){
      localStorage.clear();
      localStorage.setItem('marvelDateStorage',Date.now());
    }
  }

  const showModal = (id) => {
    setopen(true);

    if(localStorage.getItem(id)){
      setcharacterInfo(JSON.parse(localStorage.getItem(id)));
      setisLoading(false);
    }else{
      axios
      .get(`https://gateway.marvel.com/v1/public/characters/${id}?apikey=${API_PUBLIC_KEY}`)
      .then((response) => {
        console.log(response.data);
        setcharacterInfo(response.data);
        setisLoading(false);
        localStorage.setItem(id,JSON.stringify(response.data));
        if(!localStorage.getItem('marvelDateStorage')){
          localStorage.setItem('marvelDateStorage',Date.now());
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }

  const hideModal = () => {
    setopen(false);
    setisLoading(true);
  }

  const capitalizeFirstletter = string => {
    return string.charAt(0).toUpperCase + string.slice(1);
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

  const resultModal = (!loading) ? (
    <>
    <div className="modalHeader">
                <h2>{characterInfo.data.results[0].name}</h2>
              </div>
              <div className="modalBody">
                <div className="comicImage">
                    <img src={`${characterInfo.data.results[0].thumbnail.path}.${characterInfo.data.results[0].thumbnail.extension}`} alt={characterInfo.data.results[0].name}/>
                  <p>{characterInfo.attributionText}</p>
                </div>
                <div className="comicDetails">
                    <h3>Description</h3>
                    {
                      (characterInfo.data.results[0].description) ? (<p>{characterInfo.data.results[0].description}</p>) : (<p>Description introuvable</p>)
                    }
                    <h3>Plus d'infos</h3>
                    {
                      characterInfo.data.results[0].urls && 
                      characterInfo.data.results[0].urls.map((url,index)=>{
                        return <a key={index} href={url.url} target="_blank" rel="noopener noreferrer">{capitalizeFirstletter(url.type)}</a>
                      })
                    }
                </div>

              </div>
              <div className="modalFooter">
                <button className="modalBtn"  onClick={hideModal}>Fermer</button>
            </div>
        </>
  ) : (
    <>
    <div className="modalHeader">
                <h2>Reponse de marvel</h2>
              </div>
              <div className="modalBody">
                <Loader />
              </div>
        </>
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
          
        {resultModal}
      </Modal>
    </>
  );
});

export default React.memo(QuizOver);
