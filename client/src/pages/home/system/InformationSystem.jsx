import { Box, Grid, Typography } from "@mui/material";


const InformationSystemPage = () => {

  const version = '1.0.0';
  const documentUsage = 50;
  const sceneUsage = 75;
  const avatarUsage = 30; 
  const spokeUsage = 200; 

  return (
    <Grid container spacing={2}>
      {/* justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }} */}
      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Box
          sx={{
            width: 128,
            height: 64,
            position: "relative",
            marginTop: 4,
            marginBottom: 6, 
          }}
        >
          <img
            src="/assets/logo.png"
            alt="Logo"
            style={{
              objectFit: "contain",
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
        <Typography variant="body1">Version: {version}</Typography>
        <Typography variant="body1">Document Usage: {documentUsage} MB</Typography>
        <Typography variant="body1">Scene Usage: {sceneUsage} MB</Typography>
        <Typography variant="body1">Avatar Usage: {avatarUsage} MB</Typography>
        <Typography variant="body1">Spoke Resource Usage: {spokeUsage} MB</Typography>
      </Grid>
    </Grid>
  );
};

export default InformationSystemPage;
