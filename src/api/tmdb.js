const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const fallback = {
  now_playing: { results: [{ id: 1, title: "Fallback Movie", poster_path: "/fallback.jpg", vote_average: 7.5 }] },
  popular: { results: [] },
  top_rated: { results: [] },
  upcoming: { results: [] },
  details: { id: 1, title: "Fallback Movie", overview: "No data.", poster_path: "/fallback.jpg", vote_average: 7.5 },
  credits: { cast: [{ name: "Fallback Actor" }], crew: [{ job: "Director", name: "Fallback Director" }] },
  similar: { results: [] }
};

export const fetchMovies = async (category) => {
  try {
    const res = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return fallback[category] || { results: [] };
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const [details, credits, similar] = await Promise.all([
      fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`).then(res => res.json()),
      fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`).then(res => res.json()),
      fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`).then(res => res.json())
    ]);
    return { details, credits, similar };
  } catch {
    return { details: fallback.details, credits: fallback.credits, similar: fallback.similar };
  }
};
