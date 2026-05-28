import React, { createContext, useState, useEffect } from 'react';
import { tracks as fetchTracks } from '../data/tracks';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchTracks().then(data => {
      setTracks(data);
      setIsLoading(false);
    });
  }, []);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pauseTrack = () => setIsPlaying(false);

  const nextTrack = () => {
    if (!currentTrack || tracks.length === 0) return;

    const i = tracks.findIndex(t => t.id === currentTrack.id);

    if (i === -1) return;

    setCurrentTrack(tracks[(i + 1) % tracks.length]);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    if (!currentTrack || tracks.length === 0) return;

    const i = tracks.findIndex(t => t.id === currentTrack.id);

    if (i === -1) return;

    setCurrentTrack(
      tracks[(i - 1 + tracks.length) % tracks.length]
    );

    setIsPlaying(true);
  };

  const addToFavorites = (track) => {
    if (!favorites.some(t => t.id === track.id)) {
      setFavorites([...favorites, track]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(t => t.id !== id));
  };

  return (
    <PlayerContext.Provider
      value={{
        tracks,
        isLoading,

        currentTrack,
        setCurrentTrack,

        isPlaying,
        setIsPlaying,

        volume,
        setVolume,

        favorites,
        setFavorites,

        playTrack,
        pauseTrack,

        nextTrack,
        prevTrack,

        addToFavorites,
        removeFromFavorites
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};