import { useMemo } from "react";
import { Link } from "react-router-dom";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import { green, grey, red } from "@mui/material/colors";
import _ from "lodash";

const Result = ({ questions, handleResetGame, handleGoToReview }) => {

  const isInsideIframe = window.self !== window.top;
  const result = useMemo(
    () => {
      if (!questions) return null;
      const totalQuestions = questions.length;
      const correctQuestions = questions.reduce((acc, question) => {
        const correctAnswers = question.options
          .filter(item => item.isCorrect)
          .map(item => item.id);
        const answers = Array.from(question.answers);

        console.log(
          { correctAnswers, answers },
          _.isEqual(_.sortBy(correctAnswers), _.sortBy(answers))
        );

        if (_.isEqual(_.sortBy(correctAnswers), _.sortBy(answers)))
          return acc + 1;
        else return acc;
      }, 0);
      const inCorrectQuestions = totalQuestions - correctQuestions;

      return {
        totalQuestions,
        correctQuestions,
        inCorrectQuestions
      };
    },
    [questions]
  );

  return (
    <Container sx={{ height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center", height: "100%" }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
          sx={{ height: "100%" }}
        >
          <Typography
            variant="h2"
            sx={{ alignSelf: "center", fontFamily: "Alegreya" }}
          >
            Result
          </Typography>
          <Paper elevation={4} sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={4}>
              <Stack direction="column" alignItems="center" spacing={1}>
                <Typography sx={{ fontSize: "20px", color: grey[700] }}>
                  Total Questions
                </Typography>
                <Typography variant="h3" sx={{ color: grey[700] }}>
                  {result?.totalQuestions}
                </Typography>
              </Stack>

              <Stack direction="column" alignItems="center" spacing={1}>
                <Typography sx={{ fontSize: "20px", color: green[700] }}>
                  Correct Questions
                </Typography>
                <Typography variant="h3" sx={{ color: green[700] }}>
                  {result?.correctQuestions}
                </Typography>
              </Stack>

              <Stack direction="column" alignItems="center" spacing={1}>
                <Typography sx={{ fontSize: "20px", color: red[700] }}>
                  Incorrect Questions
                </Typography>
                <Typography variant="h3" sx={{ color: red[700] }}>
                  {result?.inCorrectQuestions}
                </Typography>
              </Stack>
            </Stack>
          </Paper>

          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                fullWidth
                color="info"
                endIcon={<VisibilityRoundedIcon />}
                onClick={handleGoToReview}
              >
                Review
              </Button>
              <Button
                variant="contained"
                fullWidth
                color="secondary"
                endIcon={<EditRoundedIcon />}
                onClick={handleResetGame}
              >
                Do it again
              </Button>
            </Stack>
            {!isInsideIframe && (
              <Link to={`/home/app`}>
                <Button
                  variant="contained"
                  id="goHomeButton"
                  fullWidth
                  endIcon={<HomeRoundedIcon />}
                >
                  Go home
                </Button>
              </Link>
            )}
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default Result;
