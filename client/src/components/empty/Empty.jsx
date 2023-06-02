import { Box, Typography } from "@mui/material";


const Empty = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        width: "100%",
      }}
    >
      <img src="/assets/images/no-data.png" alt="" height={256} width={256} />

      <Typography>No Data</Typography>
    </Box>
  );
};

export default Empty;
