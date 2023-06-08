import { useEffect, useRef, useState } from "react";
import { Stack, ButtonGroup, Button } from "@mui/material";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";

import Question from "./components/Question";
import QuestionService from "../../services/QuestionService";
import { useParams } from "react-router-dom";
import GettingStarted from "./components/GettingStarted";
import Ending from "./components/Ending";
import ResponseService from "../../services/ResponseService";
import AnswerService from "../../services/AnswerService";
import QuizService from "../../services/QuizService";

import { Helmet } from "react-helmet";

const Answering = () => {
  const { id: quizId } = useParams();
  const swiperRef = useRef(null);

  const [answer, setAnswer] = useState({
    username: "",
  });
  const [quiz, setQuiz] = useState();
  const [questions, setQuestions] = useState();
  const [responses, setResponses] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const loadQuiz = () => {
    QuizService.getOne(quizId).then((quiz) => {
      if (quiz) {
        setQuiz(quiz);
      }
    });
  };

  const loadQuestions = () => {
    if (quizId) {
      QuestionService.getAll({
        filters: [
          {
            key: "quizId",
            operator: "=",
            value: quizId,
          },
        ],
      }).then((questions) => {
        setQuestions(questions);
      });
    }
  };

  const loadResponses = () => {
    ResponseService.getAll({
      filters: [
        {
          key: "quizId",
          operator: "=",
          value: quizId,
        },
      ],
    }).then((responses) => {
      if (responses) {
        setResponses(responses);
      }
    });
  };

  const loadUsername = () => {
    AnswerService.getAll({
      filters: [
        {
          key: "quizId",
          operator: "=",
          value: quizId,
        },
      ],
    }).then((answer) => {
      if (answer) {
        setAnswer(answer.username);
      }
    });
  };

  const handleChangeSlide = (slide) => {
    setActiveQuestionIndex(slide.activeIndex);
  };

  const handleSaveUsername = () => {
    if (!answer.username) return;
    if (answer.id) {
      if (!answer.username) return;
      AnswerService.update(answer.id, { username: answer.username });
    } else {
      AnswerService.create({
        username: answer.username,
      });
    }
  };

  const handleSelectOption = (questionId, optionId) => {
    let _responses = responses ? [...responses] : [];
    if (_responses.length > 0) {
      let idx = _responses.findIndex((res) => res.questionId === questionId);
      if (idx > -1) {
        _responses[idx].optionId = optionId;
        ResponseService.update(_responses[idx].id, {
          optionId,
        });
      } else {
        ResponseService.create({ quizId, questionId, optionId }).then(() => {
          _responses.push({
            questionId,
            optionId,
          });
        });
      }
    } else {
      ResponseService.create({ quizId, questionId, optionId }).then(() => {
        _responses.push({
          questionId,
          optionId,
        });
      });
    }
    setResponses(_responses);
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  useEffect(() => {
    loadQuestions();
    loadResponses();
    loadUsername();
    loadQuiz();
  }, [quizId]);

  return (
    <>
      <Helmet>
        <title>{quiz?.title}</title>
      </Helmet>
      <Stack
        direction="column"
        sx={{
          maxHeight: "100%",
          height: "100%",
          maxWidth: "100%",

          pb: 12,
        }}
      >
        <Swiper
          ref={swiperRef}
          grabCursor={false}
          effect={"creative"}
          allowTouchMove={false}
          keyboard={{
            enabled: true,
          }}
          creativeEffect={{
            prev: {
              shadow: false,
              translate: [0, 0, -400],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          slidesPerView={1}
          modules={[EffectCreative, Pagination]}
          pagination={{
            type: "progressbar",
          }}
          onTransitionStart={handleChangeSlide}
          style={{ height: "100%", maxWidth: "100%" }}
        >
          <SwiperSlide>
            <GettingStarted answer={answer} setAnswer={setAnswer} />
          </SwiperSlide>
          {questions &&
            questions.map((question, index) => {
              return (
                <SwiperSlide key={question.id}>
                  <Question
                    question={question}
                    index={index}
                    handleSelectOption={handleSelectOption}
                  />
                </SwiperSlide>
              );
            })}

          <SwiperSlide>
            <Ending />
          </SwiperSlide>
        </Swiper>
        <ButtonGroup variant="text" sx={{ alignSelf: "center" }}>
          <Button
            disabled={activeQuestionIndex === 0}
            onClick={() =>
              swiperRef.current && swiperRef.current.swiper.slidePrev()
            }
          >
            <ArrowCircleLeftRoundedIcon />
          </Button>
          <Button
            disabled={questions && questions.length + 1 === activeQuestionIndex}
            onClick={() =>
              swiperRef.current && swiperRef.current.swiper.slideNext()
            }
          >
            <ArrowCircleRightRoundedIcon />
          </Button>
        </ButtonGroup>
      </Stack>
    </>
  );
};

export default Answering;
