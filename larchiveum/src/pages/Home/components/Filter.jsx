import React from "react";
import { useTranslation } from "react-i18next";

import { Button } from "src/components";

const Filter = (props) => {
  const { sortNewest, sortOldest, isActiveSortASC, isActiveSortDESC } = props;
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-2">
      <Button onClick={sortNewest}>{t("home.NEWEST")}</Button>
      <Button onClick={sortOldest}>{t("home.OLDEST")}</Button>
    </div>
  );
};

export default Filter;
