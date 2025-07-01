import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { useMovieList } from '../context/MovieListContext';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { myList, dispatch } = useMovieList();

  const isAdded = myList.some((item) => item.id === movie.id);

  const handleToggle = () => {
    dispatch({ type: isAdded ? 'REMOVE' : 'ADD', payload: movie });
  };

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3, cursor: 'pointer', position: 'relative' }}>
      <CardMedia
        component="img"
        height="220"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        onClick={() => navigate(`/play/${movie.id}`)}
        sx={{ borderRadius: 2 }}
      />
      <CardContent sx={{ p: 1 }}>
        <Typography variant="body2" noWrap>{movie.title}</Typography>
        <Typography variant="caption">⭐ {movie.vote_average}</Typography>

        <Stack direction="row" spacing={1} mt={1}>
          {/* Play Button */}
          <IconButton onClick={() => navigate(`/play/${movie.id}`)} size="small">
            <PlayArrowIcon color="primary" />
          </IconButton>

          {/* Add/Check Toggle Button */}
          <IconButton onClick={handleToggle} size="small">
            {isAdded ? (
              <CheckIcon color="success" titleAccess="Added to My List" />
            ) : (
              <AddIcon color="primary" titleAccess="Add to My List" />
            )}
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
