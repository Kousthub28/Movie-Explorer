import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import MyList from './pages/MyList';
import MovieDetails from './pages/MovieDetails';
import PlayView from './pages/PlayView';
import BottomNav from './components/BottomNav';
import { MovieListProvider } from './context/MovieListContext';
import ProfileSelection from './pages/ProfileSelection';
import './App.css';

function App() {
  const profileSelected = localStorage.getItem('profile');

  return (
    <MovieListProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={profileSelected ? <Navigate to="/home" /> : <ProfileSelection />} />
            <Route path="/home" element={<Home />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/play/:id" element={<PlayView />} />
          </Routes>
          {profileSelected && <BottomNav />}
        </div>
      </Router>
    </MovieListProvider>
  );
}

export default App;
