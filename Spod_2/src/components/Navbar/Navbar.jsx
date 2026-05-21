import React from 'react';
import "./Navbar.css"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
export default function Navbar(){
return(
    <nav>
        <div className="home">
            <Link to="/"> 
            Home
            </Link>
        </div>
        <div className="search">
             <Link to="/search"> 
            Search
            </Link>
        </div>
        <div className="favorites">
            <Link to="/search"> 
            Favorites
            </Link>
        </div>
    </nav>
)
}
