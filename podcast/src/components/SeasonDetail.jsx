import React, { useState } from 'react';
import EpisodeDetail from './EpisodeDetail';

const SeasonDetail = ({ season, addFavorite }) => {
  const [showEpisodes, setShowEpisodes] = useState(false);

  return (
    <div className="season-card">
      <img src={season.image} alt={season.title} onClick={() => setShowEpisodes(!showEpisodes)} />
      <h3>{season.title}</h3>
      <p>Episodes: {season.episodes.length}</p>
      {showEpisodes && (
        <div>
          {season.episodes.map(episode => (
            <EpisodeDetail key={episode.id} episode={episode} addFavorite={addFavorite} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SeasonDetail;
