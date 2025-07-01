import { useMovieList } from '../context/MovieListContext';
import { Box, Typography, Grid, Divider, Button } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { useEffect, useState } from 'react';
import { fetchMovies } from '../api/tmdb';

export default function MyList() {
  const { myList, dispatch } = useMovieList();
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    async function loadSuggestions() {
      const result = await fetchMovies('top_rated');
      setSuggested(result.results.slice(0, 6)); // Suggest top 6 movies
    }
    loadSuggestions();
  }, []);

  const clearList = () => {
    if (window.confirm('Clear all movies from My List?')) {
      dispatch({ type: 'SET', payload: [] });
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>My List</Typography>
        {myList.length > 0 && (
          <Button variant="outlined" color="error" onClick={clearList}>
            Clear All
          </Button>
        )}
      </Box>

      {myList.length === 0 ? (
        <Typography variant="body1" sx={{ color: 'gray' }}>
          You haven’t added anything to your list yet. Start watching and tap the ➕ icon to save your favorite movies.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {myList.map((movie) => (
            <Grid item xs={6} sm={4} md={3} lg={2.4} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        You Might Also Like
      </Typography>
      <Grid container spacing={2}>
        {suggested.map((movie) => (
          <Grid item xs={6} sm={4} md={3} lg={2.4} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
