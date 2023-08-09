import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import _ from "lodash";

import Multiple from "./Multiple";
import Single from "./Single";

const isInsideIframe = window.self !== window.top;

const Question = ({
  question,
  index,
  responses,
  handleSelectSingleOption,
  handleSelectMultipleOption,
  isInReview
}) => {
  return (
    <Container sx={{ height: " 100%" }}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%", py: 2, backgroundColor: "#fff" }}
      >
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="flex-start"
          spacing={2}
        >
          {question.type === "single" ? (
            <Single
              question={question}
              questionIndex={index}
              responses={responses}
              handleSelectSingleOption={handleSelectSingleOption}
              isInReview={isInReview}
            />
          ) : (
            <Multiple
              question={question}
              questionIndex={index}
              handleSelectMultipleOption={handleSelectMultipleOption}
              isInReview={isInReview}
            />
          )}
          {isInReview &&
            (_.isEqual(
              _.sortBy(Array.from(question.answers)),
              _.sortBy(
                question.options
                  .filter(item => item.isCorrect)
                  .map(item => item.id)
              )
            ) ? (
              <Stack direction="row" alignItems="center" spacing={2}>
                <CheckCircleRoundedIcon sx={{ color: "green" }} />
                <Typography
                  sx={{
                    alignSelf: "center",
                    fontSize: "24px",
                    fontWeight: 700,
                    fontFamily: "Alegreya",
                    color: "green"
                  }}
                >
                  Corrrect
                </Typography>
              </Stack>
            ) : (
              <Stack direction="row" alignItems="center" spacing={2}>
                <CancelRoundedIcon sx={{ color: "red" }} />
                <Typography
                  sx={{
                    alignSelf: "center",
                    fontSize: "24px",
                    fontWeight: 700,
                    fontFamily: "Alegreya",
                    color: "red"
                  }}
                >
                  Incorrect
                </Typography>
              </Stack>
            ))}
        </Stack>
      </Stack>
    </Container>
  );
};

export default Question;
