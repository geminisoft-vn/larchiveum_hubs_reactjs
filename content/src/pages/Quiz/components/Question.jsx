import { Grid, Box, Stack, Container } from "@mui/material";

import Single from "./Single";
import Multiple from "./Multiple";

const Question = ({ question, index, handleSelectOption }) => {
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
            {question.type === "single" ? (
              <Single
                question={question}
                questionIndex={index}
                handleSelectOption={handleSelectOption}
              />
            ) : (
              <Multiple />
            )}
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default Question;
