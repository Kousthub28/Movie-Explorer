// === pages/PlayView.jsx ===
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../api/tmdb';
import { Box, Typography, Button, Stack, Divider, Chip } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DownloadIcon from '@mui/icons-material/Download';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';
import { useMovieList } from '../context/MovieListContext';

export default function PlayView() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { myList, dispatch } = useMovieList();

  useEffect(() => {
    fetchMovieDetails(id).then(setData);
  }, [id]);

  if (!data) return <p>Loading...</p>;

  const isAdded = myList.find((m) => m.id === Number(id));
  const toggleList = () => {
    dispatch({ type: isAdded ? 'REMOVE' : 'ADD', payload: isAdded ? id : data.details });
  };

  const director = data.credits?.crew.find((c) => c.job === 'Director');
  const castNames = data.credits?.cast?.slice(0, 5).map((c) => c.name).join(', ');

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ position: 'relative', mb: 2 }}>
        <img
          src={`https://image.tmdb.org/t/p/w500${data.details.backdrop_path || data.details.poster_path}`}
          alt={data.details.title}
          style={{ width: '100%', maxHeight: '250px', objectFit: 'cover', borderRadius: 8 }}
        />
      </Box>

      <Typography variant="h5" fontWeight="bold">{data.details.title}</Typography>

      <Stack direction="row" spacing={1} alignItems="center" my={1}>
        <Chip label={data.details.release_date?.split('-')[0]} size="small" />
        <Chip label={Math.floor(data.details.runtime / 60) + 'h ' + (data.details.runtime % 60) + 'm'} size="small" />
        <Chip label="HD" size="small" color="primary" />
      </Stack>

      <Stack direction="row" spacing={2} my={2}>
        <Button fullWidth variant="contained" color="primary" startIcon={<PlayArrowIcon />}>Play</Button>
        <Button fullWidth variant="outlined" color="secondary" startIcon={<DownloadIcon />}>Download</Button>
      </Stack>

      <Typography variant="body2" my={1}>{data.details.overview}</Typography>
      <Typography variant="body2" color="text.secondary">Cast: {castNames}</Typography>
      <Typography variant="body2" color="text.secondary">Director: {director?.name}</Typography>

      <Stack direction="row" spacing={2} mt={2}>
        <Button onClick={toggleList} startIcon={<AddIcon />}>{isAdded ? 'Remove from List' : 'My List'}</Button>
        <Button startIcon={<ThumbUpIcon />}>Rate</Button>
        <Button startIcon={<ShareIcon />}>Share</Button>
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" fontWeight="bold">More Like This</Typography>
      <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, mt: 1 }}>
        {data.similar?.results.map((m) => (
          <img
            key={m.id}
            src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
            alt={m.title}
            width={120}
            onClick={() => window.location.href = `/play/${m.id}`}
            style={{ cursor: 'pointer', borderRadius: 6 }}
          />
        ))}
      </Box>
    </Box>
  );
}
