import React from 'react';

const FavoriteEpisodes = ({ favorites, removeFavorite }) => {
  return (
    <div>
      <h2>Favorite Episodes</h2>
      <ul className="favorites-list">
        {favorites.map(episode => (
          <li key={episode.id}>
            <h3>{episode.title}</h3>
            <button onClick={() => removeFavorite(episode.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteEpisodes;
