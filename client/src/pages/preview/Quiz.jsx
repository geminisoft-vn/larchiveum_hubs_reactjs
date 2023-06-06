import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";

import QuizService from "src/services/QuizService";

const QuizPreviewLayout = () => {
  const { id: quizId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState();

  const loadQuiz = async () => {
    if (quizId) {
      const quiz = await QuizService.getOne(quizId);
      setQuiz(quiz);
    }
  };

  const handleStartQuiz = () => {
    navigate(`/preview/answering`, { state: { quizId } });
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  return (
    <Grid container component="main" sx={{ height: "512px" }}>
      <Grid
        item
        xs={12}
        sm={8}
        md={8}
        lg={8}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: t =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <Grid
        item
        xs={12}
        sm={4}
        md={4}
        lg={4}
        component={Paper}
        elevation={6}
        square
      >
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={1}
          sx={{
            height: "100%"
          }}
        >
          <Typography component="h1" variant="h5">
            {quiz && quiz.title}
          </Typography>
          <Typography component="h4" variant="body1">
            {quiz && quiz.desc}
          </Typography>
          <Button variant="contained" onClick={handleStartQuiz}>
            Start
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default QuizPreviewLayout;
