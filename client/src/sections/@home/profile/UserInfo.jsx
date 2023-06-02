import { Grid, Paper, Stack, Button, TextField, Box } from "@mui/material";

import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

const UserInfo = ({ control, handleSaveUserInfo }) => {
  const { t } = useTranslation();
  return (
    <Paper elevation={4} sx={{ p: 2 }}>
      <Stack
        direction="column"
        alignItems="center"
        spacing={2}
        sx={{ width: "100%" }}
      >
        <Controller
          name={"username"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={onChange}
              value={value}
              label={t('LABEL.username')}
            />
          )}
        />

        <Button variant="contained" onClick={handleSaveUserInfo}>
          {t('BUTTON.save')}
        </Button>
      </Stack>
    </Paper>
  );
};

export default UserInfo;
