import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowList from './components/ShowList';
import ShowDetail from './components/ShowDetail';
import FavoriteEpisodes from './components/FavouriteEpisodes';
import Navbar from './components/NavBar';
import Profile from './components/Profile';
import Signup from './components/SignUp';
import { fetchShows } from './Api';
import { genres } from './Genre';
import './App.css';

const App = () => {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const loadShows = async () => {
      const data = await fetchShows();
      // Map over the shows to replace genreIds with actual genres
      const updatedShows = data.map(show => ({
        ...show,
        genres: show.genres.map(id => genres[id]) // Map genre IDs to genre names
      }));
      setShows(updatedShows);
      setFilteredShows(updatedShows);
    };

    loadShows();
  }, []);

  useEffect(() => {
    const results = shows.filter(show => {
      const matchesSearch = show.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre ? show.genres.includes(selectedGenre) : true;
      return matchesSearch && matchesGenre;
    });
    setFilteredShows(results);
  }, [searchTerm, selectedGenre, shows]);

  const addFavorite = (episode) => {
    setFavorites([...favorites, episode]);
  };

  const removeFavorite = (episodeId) => {
    setFavorites(favorites.filter(fav => fav.id !== episodeId));
  };

  const handleSearch = () => {
    const results = shows.filter(show => {
      const matchesSearch = show.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre ? show.genres.includes(selectedGenre) : true;
      return matchesSearch && matchesGenre;
    });
    setFilteredShows(results);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <header>
          <h1>Shows</h1>
        </header>
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search shows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
            <option value="">All Genres</option>
            {Object.entries(genres).map(([id, name]) => ( // Map over genres object
              <option key={id} value={id}>{name}</option> // Display genre name
            ))}
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>
        <Routes>
          <Route path="/" element={<ShowList shows={filteredShows} />} />
          <Route path="/show/:id" element={<ShowDetail addFavorite={addFavorite} />} />
          <Route path="/favorites" element={<FavoriteEpisodes favorites={favorites} removeFavorite={removeFavorite} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;