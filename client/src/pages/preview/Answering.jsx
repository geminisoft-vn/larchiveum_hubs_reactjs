import { useState } from "react";
import { useLocation } from "react-router-dom";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Button, ButtonGroup, Paper } from "@mui/material";
import qs from "qs";
import useSWR from "swr";

import { useData } from "src/hooks";
import Question from "src/sections/@preview/quiz/Question";
import request from "src/utils/request";

const Answering = () => {
  const { state } = useLocation();
  const { quizId } = state;

  const [answers, setAnswers] = useState();

  const { data: quiz } = useSWR(quizId ? `/quizzes/${quizId}` : null, url => {
    return request.get(url).then(res => res.data.data);
  });

  const { data: questions } = useData(
    quiz
      ? `/questions?${qs.stringify({
          filters: {
            quiz: {
              id: quiz.id
            }
          }
        })}`
      : null
  );

  const handleSelectOption = (questionId, optionId) => {
    let _answers = answers ? [...answers] : [];
    if (_answers.length > 0) {
      let idx = _answers.findIndex(ans => ans.question === questionId);
      if (idx > -1) {
        _answers[idx].question = questionId;
      } else {
        _answers.push({
          question: questionId,
          option: optionId
        });
      }
    } else {
      _answers.push({
        question: questionId,
        option: optionId
      });
    }

    setAnswers(_answers);
  };

  return (
    <Paper elevation={4} sx={{ p: 4, width: "80%", height: 512 }}>
      {questions &&
        questions.map((question, index) => {
          return (
            <Question
              key={question.id}
              question={question}
              index={index}
              total={questions.length}
              answers={answers}
              handleSelectOption={handleSelectOption}
            />
          );
        })}
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button onclick={handleGoToNextQuestion}>
          <ChevronLeftRoundedIcon />
        </Button>
        <Button onclick={handleGoToPrevQuestion}>
          <ChevronRightRoundedIcon />
        </Button>
      </ButtonGroup>
    </Paper>
  );
};

export default Answering;
