import React, { createContext, useState } from 'react';
import { tracks } from '../data/tracks';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [favorites, setFavorites] = useState([]);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const nextTrack = () => {
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrack(tracks[prevIndex]);
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
    <PlayerContext.Provider value={{
      currentTrack, isPlaying, volume, favorites,
      playTrack, pauseTrack, nextTrack, prevTrack, setVolume,
      addToFavorites, removeFromFavorites, setIsPlaying
    }}>
      {children}
    </PlayerContext.Provider>
  );
};