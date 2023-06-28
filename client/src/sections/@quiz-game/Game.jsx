import { useRef } from "react";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Button, ButtonGroup, IconButton, Stack } from "@mui/material";
import { EffectCreative, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Question } from "src/sections/@quiz-game";

import "swiper/css/effect-creative";
import "swiper/css/pagination";

import "swiper/css";

const Game = ({
  questions,
  activeQuestionIndex,
  handleChangeSlide,
  handleSelectSingleOption,
  handleSelectMultipleOption,
  handleGoToResult,
  isInReview
}) => {
  const swiperQuestionRef = useRef(null);

  return (
    <Stack
      direction="column"
      sx={{
        maxHeight: "100%",
        height: "100%",
        maxWidth: "100%",

        pb: 12,

        position: "relative"
      }}
    >
      <Swiper
        ref={swiperQuestionRef}
        grabCursor={false}
        effect={"creative"}
        allowTouchMove={false}
        keyboard={{
          enabled: true
        }}
        creativeEffect={{
          prev: {
            shadow: false,
            translate: [0, 0, -400]
          },
          next: {
            translate: ["100%", 0, 0]
          }
        }}
        slidesPerView={1}
        modules={[EffectCreative, Pagination]}
        pagination={{
          type: "progressbar"
        }}
        onTransitionStart={handleChangeSlide}
        style={{ height: "100%", maxWidth: "100%" }}
      >
        {questions &&
          questions.map((question, index) => {
            return (
              <SwiperSlide key={question.id}>
                <Question
                  question={question}
                  index={index}
                  isInReview={isInReview}
                  handleSelectSingleOption={handleSelectSingleOption}
                  handleSelectMultipleOption={handleSelectMultipleOption}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
      <ButtonGroup variant="text" sx={{ alignSelf: "center" }}>
        <Button
          disabled={activeQuestionIndex === 0}
          onClick={() =>
            swiperQuestionRef.current &&
            swiperQuestionRef.current.swiper.slidePrev()
          }
        >
          <ArrowCircleLeftRoundedIcon />
        </Button>

        <Button
          disabled={questions && questions.length - 1 === activeQuestionIndex}
          onClick={() =>
            swiperQuestionRef.current &&
            swiperQuestionRef.current.swiper.slideNext()
          }
        >
          <ArrowCircleRightRoundedIcon />
        </Button>
        {!isInReview && (
          <Button variant="contained" onClick={handleGoToResult}>
            Submit
          </Button>
        )}
      </ButtonGroup>

      {isInReview && (
        <Box sx={{ position: "absolute", top: 32, right: 32, zIndex: 999 }}>
          <IconButton onClick={handleGoToResult}>
            <CloseRoundedIcon sx={{ fontSize: 64 }} />
          </IconButton>
        </Box>
      )}
    </Stack>
  );
};

export default Game;
