import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import Multiple from "./Multiple";
import Single from "./Single";

import _ from "lodash";

const Question = ({
  question,
  index,
  responses,
  handleSelectOption,
  isInReview
}) => {
  return (
    <Container sx={{ height: " 100%" }}>
      <Stack
        direction="row"
        alignItems="center"
        sx={{ height: "100%", py: 2, backgroundColor: "#fff" }}
      >
        <Grid container spacing={12}>
          {/* <Grid item lg={5} md={5} sm={12} xs={12}> */}
          {/*   <Box sx={{ height: { lg: 512, md: 512, sm: 256, xs: 128 } }}> */}
          {/*     <img */}
          {/*       src="https://source.unsplash.com/random?wallpapers" */}
          {/*       alt="" */}
          {/*       style={{ */}
          {/*         width: "100%", */}
          {/*         height: "100%", */}

          {/*         objectFit: "cover" */}
          {/*       }} */}
          {/*     /> */}
          {/*   </Box> */}
          {/* </Grid> */}

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
              spacing={2}
            >
              {question.type === "single" ? (
                <Single
                  question={question}
                  questionIndex={index}
                  responses={responses}
                  handleSelectOption={handleSelectOption}
                  isInReview={isInReview}
                />
              ) : (
                <Multiple
                  question={question}
                  questionIndex={index}
                  handleSelectOption={handleSelectOption}
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
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default Question;
