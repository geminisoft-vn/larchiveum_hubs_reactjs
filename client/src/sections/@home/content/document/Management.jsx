import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";

import Iconify from "src/components/iconify";
import { DocumentService } from "src/services";

import Documents from "./Documents";

const Management = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleAddNewDocument = () => {
    navigate(`/home/document-form`);
  };

  return (
    <Stack direction="column" spacing={2}>
      <Button
        variant="contained"
        startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleAddNewDocument}
        sx={{
          alignSelf: "flex-start"
        }}
      >
        {t("BUTTON.add")}
      </Button>

      <Documents />
    </Stack>
  );
};

export default Management;
