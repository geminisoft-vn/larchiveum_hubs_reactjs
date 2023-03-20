/* eslint-disable react/display-name */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Quizzes from "./Quizzes";

const QuizManagement = (props) => {
  const { t } = useTranslation();

  return <Quizzes />;
};

export default QuizManagement;
