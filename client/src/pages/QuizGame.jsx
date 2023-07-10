import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { parseInt } from "lodash";
import { enqueueSnackbar } from "notistack";

import { useEventBus } from "src/hooks";
import { GettingStarted } from "src/sections/@quiz-game";
import Game from "src/sections/@quiz-game/Game";
import Result from "src/sections/@quiz-game/Result";
import QuestionService from "src/services/QuestionService";
import QuizService from "src/services/QuizService";
import { STEP } from "src/utils/constant";

import "swiper/css/effect-creative";
import "swiper/css/pagination";

import "swiper/css";

const QuizGame = () => {
  const { id: quizId } = useParams();

  const { $emit } = useEventBus();

  const swiperQuestionRef = useRef(null);

  const [quiz, setQuiz] = useState();
  const [questions, setQuestions] = useState();
  const [step, setStep] = useState(STEP["GETTING_STARTED"]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isInReview, setIsInReview] = useState(false);

  const loadQuiz = () => {
    QuizService.getOne(quizId).then(quiz => {
      if (quiz) {
        setQuiz(quiz);
      }
    });
  };

  const loadQuestions = () => {
    QuestionService.getAll({
      filters: [
        {
          key: "quizId",
          operator: "=",
          value: quizId
        }
      ]
    }).then(questions => {
      let _questions = questions.map(item => ({
        ...item,
        answers: new Set([])
      }));
      setQuestions(_questions);
    });
  };

  const handleChangeSlide = slide => {
    setActiveQuestionIndex(slide.activeIndex);
  };

  const handleSelectSingleOption = (questionIdx, optionId) => {
    questions[questionIdx].answers.clear();
    questions[questionIdx].answers.add(parseInt(optionId, 10));
    setQuestions(questions);
  };

  const handleSelectMultipleOption = (checked, questionIdx, optionId) => {
    if (checked) {
      if (!questions[questionIdx].answers.has(parseInt(optionId, 10))) {
        questions[questionIdx].answers.add(parseInt(optionId, 10));
      }
    } else {
      questions[questionIdx].answers.delete(parseInt(optionId, 10));
    }
    setQuestions(questions);
  };

  const handleStartQuiz = () => {
    setStep(STEP["GAME"]);
    setIsInReview(false);
  };

  const handleGoToNextQuiz = () => {
    if (swiperQuestionRef.current && questions && questions.length > 0) {
      const question = questions[activeQuestionIndex];
      if (question && question.answers) {
        if (question.answers.size <= 0) {
          enqueueSnackbar("Please choose at least one option!", {
            variant: "error"
          });
        } else {
          if (questions.length === activeQuestionIndex + 1) {
            $emit("alert/open", {
              title: "Submit Quiz",
              content: "Do you want to submit?",
              okText: "Submit",
              okCallback: () => {
                setStep(STEP["RESULT"]);
                setIsInReview(false);
              }
            });
            return;
          }
          swiperQuestionRef.current.swiper.slideNext();
        }
      }
    }
  };

  const handleGoToResult = () => {
    setStep(STEP["RESULT"]);
    setIsInReview(false);
  };

  const handleGoToReview = () => {
    setActiveQuestionIndex(0);
    setIsInReview(true);
    setStep(STEP["GAME"]);
  };

  const handleResetGame = () => {
    for (const question of questions) {
      question.answers.clear();
      setActiveQuestionIndex(0);
    }
    setIsInReview(false);
    setStep(STEP["GAME"]);
  };

  useEffect(
    () => {
      loadQuestions();
      loadQuiz();
    },
    [quizId]
  );

  return (
    <>
      <Helmet>
        <title>{quiz?.title}</title>
      </Helmet>

      {step === STEP["GETTING_STARTED"] && (
        <GettingStarted quiz={quiz} handleStartQuiz={handleStartQuiz} />
      )}

      {step === STEP["GAME"] && (
        <Game
          swiperQuestionRef={swiperQuestionRef}
          questions={questions}
          activeQuestionIndex={activeQuestionIndex}
          handleChangeSlide={handleChangeSlide}
          handleSelectSingleOption={handleSelectSingleOption}
          handleSelectMultipleOption={handleSelectMultipleOption}
          handleGoToNextQuiz={handleGoToNextQuiz}
          handleGoToResult={handleGoToResult}
          isInReview={isInReview}
        />
      )}

      {step === STEP["RESULT"] && (
        <Result
          questions={questions}
          handleResetGame={handleResetGame}
          handleGoToReview={handleGoToReview}
        />
      )}
    </>
  );
};

export default QuizGame;
