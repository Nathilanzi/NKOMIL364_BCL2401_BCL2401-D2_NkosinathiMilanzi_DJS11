import React, { useRef, useState, useEffect } from 'react';

const AudioPlayer = ({ episode }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audioElement = audioRef.current;

    const updateProgress = () => {
      const currentTime = audioElement.currentTime;
      const duration = audioElement.duration;
      const progressPercent = (currentTime / duration) * 100;
      setProgress(progressPercent);
    };

    audioElement.addEventListener('timeupdate', updateProgress);

    return () => {
      audioElement.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={episode.file} />
      <div className="player-controls">
        <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
      </div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default AudioPlayer;
