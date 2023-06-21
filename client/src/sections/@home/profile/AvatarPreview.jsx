import { useTranslation } from "react-i18next";
import { Box, Button, Paper, Stack } from "@mui/material";

const AvatarPreview = ({ avatar, handleOpenAvatarPickingModal }) => {
  const { t } = useTranslation();
  console.log({ avatar });
  return (
    <Paper elevation={4} sx={{ p: 2, minHeight: "512px" }}>
      <Stack
        direction="column"
        alignItems="center"
        sx={{ height: "100%", width: "100%" }}
      >
        <Stack direction="column" spacing={1} sx={{ width: "100%" }}>
          <Box style={{ width: "100%", height: 512 }}>
            {avatar && (
              <model-viewer
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%"
                }}
                src={avatar?.gltfs?.avatar}
                camera-controls
              />
            )}{" "}
          </Box>
          <Button
            variant="contained"
            onClick={handleOpenAvatarPickingModal}
            sx={{ alignSelf: "center" }}
          >
            {t("BUTTON.change")}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default AvatarPreview;
