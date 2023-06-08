import { Container, Stack, Grid, Box, TextField } from "@mui/material";

const GettingStarted = ({ answer, setAnswer }) => {
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

                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>

          <Grid item lg={7} md={7} sm={12} xs={12}>
            <Stack direction="row" alignItems="center" sx={{ height: "100%" }}>
              <TextField
                label="What's your name?"
                variant="standard"
                fullWidth
                autoFocus
                value={answer?.username || ""}
                onChange={(e) =>
                  setAnswer((prev) => ({ ...prev, username: e.target.value }))
                }
                inputProps={{ style: { fontSize: 32 } }}
                InputLabelProps={{ style: { fontSize: 28 } }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default GettingStarted;
