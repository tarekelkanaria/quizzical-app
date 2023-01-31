import { decode } from "html-entities";
import { useEffect, useState } from "react";
import "./style.css";
const Options = (props) => {
  const [answerOptions, setAnswerOptions] = useState(createOptions());

  function createOptions() {
    const choices = props.block.map((answer) => {
      return {
        option: answer,
        isCorrect: false,
        isSelected: false,
      };
    });
    return choices;
  }

  useEffect(() => {
    answerOptions.map((opt) => {
      if (opt.isCorrect) props.sumOfCorrect();
    });
  }, [props.gameState]);

  function manageSelectedAnswer(id) {
    setAnswerOptions((prevOptions) =>
      prevOptions.map((opt) => {
        if (opt.option === id) {
          if (opt.isSelected) {
            return { ...opt, isSelected: !opt.isSelected, isCorrect: false };
          } else {
            return {
              ...opt,
              isSelected: !opt.isSelected,
              isCorrect: opt.option === props.correct ? true : false,
            };
          }
        } else {
          if (opt.isSelected) {
            return { ...opt, isSelected: !opt.isSelected, isCorrect: false };
          } else {
            return opt;
          }
        }
      })
    );
  }
  const chechClass = (opt) => {
    if (opt.isSelected && opt.isCorrect) {
      return `btn correct-answer`;
    } else if (opt.isSelected) {
      return `btn incorrect-answer`;
    } else {
      return `btn disable`;
    }
  };
  const answersElements = answerOptions.map((answer) => {
    const multiClass = chechClass(answer);
    return (
      <button
        disabled={props.gameState}
        key={answer.option}
        className={
          props.gameState
            ? multiClass
            : answer.isSelected
            ? "btn selected"
            : "btn not-selected"
        }
        onClick={() => manageSelectedAnswer(answer.option)}
      >
        {decode(answer.option)}
      </button>
    );
  });

  return <section className="answers">{answersElements}</section>;
};
export default Options;
