import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";

import Iconify from "src/components/iconify";
import { QuizService } from "src/services";

import Quizzes from "./Quizzes";

const Management = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleAddNewQuiz = () => {
    navigate(`/home/quiz-form`);
  };

  return (
    <Stack direction="column" spacing={2}>
      <Button
        variant="contained"
        startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleAddNewQuiz}
        sx={{
          alignSelf: "flex-start"
        }}
      >
        {t("BUTTON.add")}
      </Button>

      <Quizzes />
    </Stack>
  );
};

export default Management;
