import { Box, Typography, Grid, Tabs, Tab, Button } from '@mui/material';
import MovieCard from './MovieCard';
import { useState } from 'react';
import { useMovieList } from '../context/MovieListContext';

const categories = ['Movies', 'TV Shows', 'Cast', 'Crew', 'Studios', 'Discs', 'Files'];

export default function MovieSection({ title, movies }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const { dispatch, myList } = useMovieList();

  const handleAddAll = () => {
    movies.forEach((movie) => {
      if (!myList.find((m) => m.id === movie.id)) {
        dispatch({ type: 'ADD', payload: movie });
      }
    });
  };

  return (
    <Box sx={{ mb: 4, px: 2 }}>
      <Tabs
        value={selectedTab}
        onChange={(e, newValue) => setSelectedTab(newValue)}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable category tabs"
        sx={{ mb: 2 }}
      >
        {categories.map((cat, index) => (
          <Tab key={cat} label={cat} />
        ))}
      </Tabs>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{title}</Typography>
        <Button onClick={handleAddAll} variant="outlined" size="small">Add All to My List</Button>
      </Box>

      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={6} sm={4} md={3} lg={2.4} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
