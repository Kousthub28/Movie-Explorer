import { useEffect, useState } from 'react';
import { fetchMovies } from '../api/tmdb';
import MovieSection from '../components/MovieSection';
import { Box, TextField, Typography } from '@mui/material';

export default function Home() {
  const [sections, setSections] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function load() {
      const trending = await fetchMovies('now_playing');
      const crowd = await fetchMovies('popular');
      const shows = await fetchMovies('top_rated');
      const upcoming = await fetchMovies('upcoming');

      setSections({
        'Critically Acclaimed US TV Shows': shows.results,
        'Crowd Pleasers': crowd.results,
        'Because you watched Wish Dragon': trending.results,
        'Your Next Watch': upcoming.results,
      });
    }

    load();
  }, []);

  const filterMovies = (movies) =>
    movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Box>
      {/* Centered Title */}
      <Box sx={{ pt: 2, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
           Movie Explorer
        </Typography>
      </Box>

      {/* Search Input */}
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      {/* Movie Sections */}
      {Object.entries(sections).map(([title, movies]) => (
        <MovieSection key={title} title={title} movies={filterMovies(movies)} />
      ))}
    </Box>
  );
}
