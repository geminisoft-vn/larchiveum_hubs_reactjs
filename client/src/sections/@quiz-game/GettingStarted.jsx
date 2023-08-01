import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";

const GettingStarted = ({ quiz, handleStartQuiz }) => {
  return (
    <Container sx={{ height: " 100%" }}>
      <Stack
        direction="row"
        alignItems="center"
        sx={{ height: "100%", py: 2, backgroundColor: "#fff" }}
      >
        <Grid container spacing={12}>
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <Box sx={{ height: { lg: 512, md: 512, sm: 256, xs: 128 } }}>
              <img
                src="https://source.unsplash.com/random?wallpapers"
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            </Box>
          </Grid>

          <Grid item lg={7} md={7} sm={12} xs={12}>
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
              spacing={2}
              sx={{ height: "100%" }}
            >
              <Typography variant="h2">{quiz?.title}</Typography>
              <Typography variant="body">{quiz?.desc}</Typography>
              <Button
                variant="contained"
                endIcon={<FlagRoundedIcon />}
                size="large"
                onClick={handleStartQuiz}
              >
                Start
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default GettingStarted;
