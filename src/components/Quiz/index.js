import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { QuizMarvel } from "../quizMarvel";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import QuizOver from "../QuizOver";
import { FaChevronRight } from "react-icons/fa";

class Quiz extends Component {
  constructor(props) {
    super(props);
    //state au debut
    this.initialstate = {
      levelNames: ["debutant", "confirme", "expert"],
      quizLevel: 0,
      maxQuestion: 10,
      storedQuestion: [],
      question: null,
      options: [],
      idquestion: 0,
      btnDisabled: true,
      userAnswer: null,
      score: 0,
      showwelcomemsg: false,
      quizEnd: false,
    };

    this.state = this.initialstate;
    //ref pour creer les question
    this.storedDataRef = React.createRef();
  }

  loadQuestion = (levels) => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[levels];
    console.log(fetchedArrayQuiz.length);
    if (fetchedArrayQuiz.length >= this.state.maxQuestion) {
      // ilay ref misy an'ilay izy rehetra
      this.storedDataRef.current = fetchedArrayQuiz;
      //izy rehtra tsisy reponse
      const newArray = fetchedArrayQuiz.map(({ answer, ...reste }) => reste);
      this.setState({ storedQuestion: newArray });
    } else {
      console.log("pas assez de question");
    }
  };

  showToastMsg = (pseudo) => {
    if (!this.state.showwelcomemsg) {
      this.setState({
        showwelcomemsg: true,
      });

      toast(`Welcome ${pseudo} !`);
    }
  };

  //methode mandefa rhf vita ny render
  componentDidMount() {
    this.loadQuestion(this.state.levelNames[this.state.quizLevel]);
  }

  //methode rhf mise a jour ny stae
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.storedQuestion !== prevState.storedQuestion &&
      this.state.storedQuestion.length
    ) {
      this.setState({
        question: this.state.storedQuestion[this.state.idquestion].question,
        options: this.state.storedQuestion[this.state.idquestion].options,
      });
    }

    if (
      this.state.idquestion !== prevState.idquestion &&
      this.state.storedQuestion.length
    ) {
      this.setState({
        question: this.state.storedQuestion[this.state.idquestion].question,
        options: this.state.storedQuestion[this.state.idquestion].options,
        userAnswer: null,
        btnDisabled: true,
      });
    }

    if (this.state.quizEnd !== prevState.quizEnd) {
      // console.log(this.state.score);
      const reussite = this.getpourcentagereussite(
        this.state.maxQuestion,
        this.state.score
      );
      this.gameOver(reussite);
    }

    if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
      this.showToastMsg(this.props.userData.pseudo);
    }
  }

  submitanswer = (value) => {
    this.setState({
      userAnswer: value,
      btnDisabled: false,
    });
  };

  nextQuestion = () => {
    if (this.state.idquestion === this.state.maxQuestion - 1) {
      //Quiz terminer
      this.setState({
        quizEnd: true,
      });
    } else {
      //
      this.setState((prevState) => ({
        idquestion: prevState.idquestion + 1,
      }));
    }

    const reponse = this.storedDataRef.current[this.state.idquestion].answer;

    if (reponse === this.state.userAnswer) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));
      toast.success("Bravo!");
    } else {
      toast.error("Mauvaise reponse!");
    }
  };

  getpourcentagereussite = (maxquestion, score) => (score / maxquestion) * 100;

  gameOver = (reussite) => {
    if (reussite >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent: reussite,
        // quizEnd: true,
      });
    } else {
      this.setState({
        percent: reussite,
        // quizEnd: true,
      });
    }
  };

  loadLevelQuestion = (params) => {
    this.setState({ ...this.initialstate, quizLevel: params });
    this.loadQuestion(this.state.levelNames[params]);
  };

  render() {
    const display = this.state.options.map((value, index) => {
      return (
        <p
          onClick={() => this.submitanswer(value)}
          className={`answerOptions ${
            this.state.userAnswer === value && "selected"
          }`}
          key={index}
        >
          <FaChevronRight /> {value}
        </p>
      );
    });
    const { pseudo } = this.props.userData;

    return this.state.quizEnd ? (
      <QuizOver
        ref={this.storedDataRef}
        levelNames={this.state.levelNames}
        score={this.state.score}
        maxquestion={this.state.maxQuestion}
        quizLevel={this.state.quizLevel}
        percent={this.state.percent}
        loadLevelQuestion={this.loadLevelQuestion}
      />
    ) : (
      <>
        <h2>Salut {pseudo}</h2>
        {/* passer le props les niveaux dispo et le level a present*/}
        <Levels
          levelNames={this.state.levelNames}
          quizLevel={this.state.quizLevel}
        />
        <ProgressBar
          idquestion={this.state.idquestion}
          maxQuestion={this.state.maxQuestion}
        />
        <h2>{this.state.question}</h2>
        {display}
        <button
          className="btnSubmit"
          disabled={this.state.btnDisabled}
          onClick={this.nextQuestion}
        >
          {this.state.idquestion < this.state.maxQuestion - 1
            ? "Suivant"
            : "Terminer"}
        </button>
        <ToastContainer />
      </>
    );
  }
}

export default Quiz;
