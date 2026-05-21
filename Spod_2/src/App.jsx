import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PlayerProvider } from './context/PlayerContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Favorites from './pages/Favorites/Favorites';
import PlayerBar from './components/PlayerBar/PlayerBar';

function App() {
  return (
     <PlayerProvider>
      <BrowserRouter>
        <div className="app-container">
        <PlayerBar />
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
            <Navbar/>
        </div>
      </BrowserRouter>
     </PlayerProvider>
  );
}
export default App;