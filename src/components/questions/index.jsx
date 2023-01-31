import { useEffect, useState } from "react";
import { decode } from "html-entities";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import APIData from "../apis";
import Options from "../options";
import "./style.css";

const Questions = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const generateQuiz = (data) => {
    const quiz = [];
    for (let i = 0; i < 5; i++) {
      const quizQuestion = data[Math.floor(Math.random() * 20)];
      if (!quiz.includes(quizQuestion)) {
        quiz.push(quizQuestion);
      } else {
        i--;
      }
    }
    return quiz;
  };

  function randomAnswers(data) {
    const answers = [];
    for (let i = 0; i < 4; i++) {
      let randomAnswer = data[Math.floor(Math.random() * 4)];
      if (!answers.includes(randomAnswer)) answers.push(randomAnswer);
      else i--;
    }
    return answers;
  }

  useEffect(() => {
    APIData().then((resData) => {
      const requestedData = generateQuiz(resData);
      if (!gameOver)
        setAllQuestions(
          requestedData.map((data) => {
            return {
              question: data.question,
              answers: randomAnswers([
                ...data.incorrect_answers,
                data.correct_answer,
              ]),
              correct: data.correct_answer,
            };
          })
        );
    });
  }, [gameOver]);

  function endGame() {
    setGameOver((prevState) => !prevState);
  }
  function sumCorrect() {
    setCorrectCount((prevCorrect) => prevCorrect + 1);
    if (!gameOver) setCorrectCount(0);
  }

  const { width, height } = useWindowSize();

  const questionElements = allQuestions.map((block) => {
    return (
      <div key={block.question} className="question__container">
        <h2 className="question">{decode(block.question)}</h2>
        <Options
          block={block.answers}
          correct={block.correct}
          sumOfCorrect={sumCorrect}
          gameState={gameOver}
        />
      </div>
    );
  });

  return (
    <article className="questions">
      {gameOver && correctCount >= 4 && (
        <Confetti width={width} height={height} />
      )}
      {questionElements}
      <div className="final">
        {gameOver && (
          <p className="end-statement">
            You scored {correctCount}/5 correct answers
          </p>
        )}
        <button className="end" onClick={endGame}>
          {gameOver ? "Play again" : "Check answers"}
        </button>
      </div>
    </article>
  );
};

export default Questions;
