import React from "react";
import { Link } from "react-router-dom";

import { Stack, Button } from "@mui/material";

import Iconify from "src/components/iconify";

import Documents from "./Documents";
import { useTranslation } from "react-i18next";

const Management = () => {
  const { t } = useTranslation();
  return (
    <Stack direction="column" spacing={2}>
      <Link
        to={`/home/document-form`}
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
          {t('BUTTON.add')}
        </Button>
      </Link>

      <Documents />
    </Stack>
  );
};

export default Management;
