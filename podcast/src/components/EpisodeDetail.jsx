import React from 'react';
import AudioPlayer from './AudioPlayer';

const EpisodeDetail = ({ episode, addFavorite }) => {
  return (
    <div className="episode-card">
      <h4>{episode.title}</h4>
      <button onClick={() => addFavorite(episode)}>Add to Favorites</button>
      <AudioPlayer episode={episode} />
    </div>
  );
};

export default EpisodeDetail;
