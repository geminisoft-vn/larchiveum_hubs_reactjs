import React from "react";
import { Container } from "@mui/material";

import { GettingStarted } from "src/sections/@quiz-game";

const Thumbnail = ({ contentType, title, content }) => {
  if (contentType === "documents") {
    return (
      <>
        <Container sx={{ height: "100%" }}>
          <h1 id="app-title">{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Container>
      </>
    );
  } else {
    return <GettingStarted quiz={{ title, desc: content }} />;
  }
};

export default Thumbnail;
