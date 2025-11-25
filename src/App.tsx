import React from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import './App.css';
//import  PokemonDetails from './pages/pokemonDetails';
//import LoginForm from './pages/LoginForm';
import PokemonList from './pages/pokemonList';
import Login from './pages/Login';
import Logout from './components/Logout';
import PokemonDetailsModal from './components/pokemonDetailsModal';
//import about from  "./pages/about";
//import NotFound from "./pages/NotFound";



const App: React.FC = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
         <Route path="/" element={<Navigate to="/pokemon" replace />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/pokemon" element={<PokemonList />} />
          <Route path="/Logout" element={<Logout/>} />
        </Routes>
        {background && (
          <Routes>
            <Route path="/pokemon/:id" element={<PokemonDetailsModal />} />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;