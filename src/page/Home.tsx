// src/App.tsx
//define peliculas y pasa a componentes.

import React, { useEffect, useState } from "react";
import "../styles/MovieCard.css";
import "../styles/HomePage.css";
import "../styles/MovieList.css"
import { getMovies } from "../services/APIService";
import Movie from "../models/Movie";
import MovieList from "../components/movielist";
import Loader from "../components/LoaderAPI";



//app es un componente de tipo funcion de reactx
//useState variable de react
const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getMovies().then((movies: Movie[]) => {
      setMovies(movies);
    
    }).finally(() => {
      setIsLoading(false);
    })
  }, []);

  return (
    <div>
      <h1>descubre los clásicos de culto en cinema paraíso</h1>
     
      {isLoading && <Loader />}

      {/* {movies} son las peliculas */}
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
