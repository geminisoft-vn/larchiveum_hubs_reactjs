import React from "react";
import { useTranslation } from "react-i18next";
import { ButtonGroup } from "@mui/material";

import { Button } from "src/components";

const Filter = (props) => {
  const { sortNewest, sortOldest, isActiveSortASC, isActiveSortDESC } = props;
  const { t } = useTranslation();
  return (
    <ButtonGroup>
      <Button
        onClick={sortNewest}
        variant={isActiveSortASC ? "contained" : "outlined"}
      >
        {t("home.NEWEST")}
      </Button>
      <Button
        onClick={sortOldest}
        variant={isActiveSortDESC ? "contained" : "outlined"}
      >
        {t("home.OLDEST")}
      </Button>
    </ButtonGroup>
  );
};

export default Filter;
