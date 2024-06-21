import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchShows } from '../Api';
import LoadingSpinner from './LoadingSpinner';
import genre from '../genres';

const ShowList = () => {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const loadShows = async () => {
        try {
          const showsData = await fetchShows();
          setShows(showsData);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      loadShows();
    }, []);
  
    if (loading) return <LoadingSpinner />;
    if (error) return <div>Error: {error}</div>;
  
    return (
        <div><h1>Shows</h1></div>,
      <div className="show-list">
        {shows.map((show) => (
          <div key={show.id} className="show-card">
            <Link to={`/show/${show.id}`}>
              <img src={show.image} alt={show.title} />
            </Link>
            <div className="show-details">
              <h2 className="showTitle">{show.title}</h2>
              <p className="showSeasons">Seasons: {show.seasons}</p>
              <p className="Date">Last Updated: {new Date(show.updated).toLocaleDateString()}</p>
              <p className="showGenre">{genre[show.genres]}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ShowList;