import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Header from './components/header/Header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import React,{useEffect,useState} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

const App=()=> {
  const [sourceName, setSourceName] = useState("");
  
  useEffect(()=>{
    alanBtn({
      key : "9be5488c625a744cf2fa40458e343be82e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand : ({command,sourceName})=>{
        if(command === 'popularMovies'){
          setSourceName(sourceName);
        }
      }
    })
  },[sourceName]);

  return (
    <div className="App">
        <Router>
          <Header />
          {sourceName!=='' && sourceName!=='home' && <Navigate to={`/movies/${sourceName}`}/>}
           {sourceName!=='' && sourceName==='home' && <Navigate to={`/`}/>}
          
            <Routes>
                <Route index element={<Home />}></Route>
                <Route path="movie/:id" element={<Movie />}></Route>
                <Route path="movies/:type" element={<MovieList />}></Route>
                <Route path="/*" element={<h1>Error Page</h1>}></Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;