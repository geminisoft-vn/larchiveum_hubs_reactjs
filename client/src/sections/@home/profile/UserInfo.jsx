import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormHelperText from "@mui/material/FormHelperText";
import { Box, Button, Grid, Paper, Stack, TextField } from "@mui/material";
import { SnackbarProvider } from "notistack";

const UserInfo = ({ handleSaveUserInfo }) => {
  const { t } = useTranslation();
  const { control, formState } = useFormContext();
  const { errors } = formState;


  return (
    <Paper elevation={4} sx={{ p: 2 }}>
      <SnackbarProvider
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      />
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
            <>
              <TextField
                fullWidth
                InputLabelProps={{ shrink: true }}
                onChange={onChange}
                value={value}
                label={t("LABEL.username")}
                error={errors?.username?.message} 
                helperText={errors?.username?.message} 
              />
              <FormHelperText sx={{fontSize: 14}}>{'Please enter a name consisting of 3 to 32 Korean characters, alphabets, number, hyphesis(-), underscores(_), and tildes(~).'}</FormHelperText>
            </>
          )}
        />

        <Button variant="contained" onClick={handleSaveUserInfo}>
          {t("BUTTON.save")}
        </Button>
      </Stack>
    </Paper>
  );
};

export default UserInfo;
