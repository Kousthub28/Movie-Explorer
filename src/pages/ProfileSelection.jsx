import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid } from '@mui/material';

export default function ProfileSelection() {
  const navigate = useNavigate();

  const selectProfile = (profile) => {
    localStorage.setItem('profile', profile);
    navigate('/home');
  };

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" mb={3}>Who's Watching?</Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: 120, height: 120, borderRadius: 2 }}
            onClick={() => selectProfile('personal')}
          >
            Personal
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: 120, height: 120, borderRadius: 2 }}
            onClick={() => selectProfile('kids')}
          >
            Kids
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
