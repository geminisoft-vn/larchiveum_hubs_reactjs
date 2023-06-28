import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import { GettingStarted } from "src/sections/@quiz-game";
import Game from "src/sections/@quiz-game/Game";
import Result from "src/sections/@quiz-game/Result";
import QuestionService from "src/services/QuestionService";
import QuizService from "src/services/QuizService";
import { STEP } from "src/utils/constant";

import "swiper/css/effect-creative";
import "swiper/css/pagination";

import "swiper/css";
import { parseInt } from "lodash";

const QuizGame = () => {
  const { id: quizId } = useParams();

  const [step, setStep] = useState(STEP["GETTING_STARTED"]);
  const [quiz, setQuiz] = useState();
  const [questions, setQuestions] = useState();
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
          questions={questions}
          activeQuestionIndex={activeQuestionIndex}
          handleChangeSlide={handleChangeSlide}
          handleSelectSingleOption={handleSelectSingleOption}
          handleSelectMultipleOption={handleSelectMultipleOption}
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
