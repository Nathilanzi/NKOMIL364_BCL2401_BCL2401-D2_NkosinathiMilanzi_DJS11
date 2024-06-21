import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Genre ID to Title mapping
const genreMapping = {
  1: 'Personal Growth',
  2: 'Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family'
};

const GenreList = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGenres = async () => {
    try {
      const response = await fetch('https://podcast-api.netlify.app');
      const data = await response.json();
      
      // Extract genres from the previews
      const genreIds = new Set();
      data.forEach(show => show.genreIds.forEach(id => genreIds.add(id)));

      // Map genre IDs to titles
      const genres = Array.from(genreIds).map(id => ({
        id,
        title: genreMapping[id]
      }));

      setGenres(genres);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const renderContent = () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div>
        <h1>Genre</h1>
        <ul>
          {genre.map(genre => (
            <li key={genre.id}>
              <Link to={`/genre/${genre.id}`}>
                {genre.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return renderContent();
};

export default GenreList;
