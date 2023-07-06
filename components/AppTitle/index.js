import { Box, Typography } from '@mui/material';

const AppTitle = () => {
  return (
    <Box sx={{ marginTop: '40px' }}>
      <Typography
        variant="h1"
        sx={{ fontSize: '40px', fontWeight: 'bold', textAlign: 'center' }}
      >
        Headlines Generator
      </Typography>
    </Box>
  );
};

export default AppTitle;
