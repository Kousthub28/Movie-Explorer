import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../api/tmdb';
import { useMovieList } from '../context/MovieListContext';
import { Box, Typography, Button } from '@mui/material';

export default function MovieDetails() {
  const { id } = useParams();
  const { myList, dispatch } = useMovieList();
  const [data, setData] = useState({});

  useEffect(() => {
    fetchMovieDetails(id).then(setData);
  }, [id]);

  if (!data.details) return <p>Loading...</p>;

  const isAdded = myList.find((m) => m.id === Number(id));
  const toggleList = () => {
    dispatch({ type: isAdded ? 'REMOVE' : 'ADD', payload: isAdded ? id : data.details });
  };

  const director = data.credits?.crew.find((c) => c.job === 'Director');

  return (
    <Box sx={{ p: 2 }}>
      <img src={`https://image.tmdb.org/t/p/w500${data.details.poster_path}`} width="200" alt="Poster" />
      <Typography variant="h4">{data.details.title}</Typography>
      <Typography>⭐ {data.details.vote_average}</Typography>
      <Typography>{data.details.overview}</Typography>
      <Typography>🎬 Director: {director?.name}</Typography>
      <Typography>👥 Cast: {data.credits?.cast.slice(0, 5).map((c) => c.name).join(', ')}</Typography>
      <Button variant="contained" onClick={toggleList} sx={{ mt: 2 }}>
        {isAdded ? 'Remove from My List' : 'Add to My List'}
      </Button>

      <Typography variant="h6" mt={4}>Similar Movies</Typography>
      <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2 }}>
        {data.similar?.results.map((m) => (
          <img
            key={m.id}
            src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
            alt={m.title}
            width={120}
            onClick={() => window.location.href = `/movie/${m.id}`}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </Box>
    </Box>
  );
}
