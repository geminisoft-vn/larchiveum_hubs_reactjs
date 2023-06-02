import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";

import Iconify from "src/components/iconify";

import Quizzes from "./Quizzes";

const Management = () => {
  const { t } = useTranslation();
  return (
    <Stack direction="column" spacing={2}>
      <Link
        to={`/home/quiz-form`}
        style={{
          alignSelf: "flex-start",
        }}
      >
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
          sx={{
            alignSelf: "flex-end",
          }}
        >
          {t("BUTTON.add")}
        </Button>
      </Link>

      <Quizzes />
    </Stack>
  );
};

export default Management;
