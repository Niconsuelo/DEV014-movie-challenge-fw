// src/App.tsx
//define peliculas y pasa a componentes.

import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";
import { getMovies } from "../services/APIService";
import Movie from "../models/Movie";
import MovieList from "../components/movielist";
import Loader from "../components/LoaderAPI";

//app es un componente de tipo funcion de reactx
//useState variable de react
const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [buttonLoader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    getMovies().then((movies: Movie[]) => {
      setMovies(movies);
    });
  }, []);

  function buttonAlert() {
    //cuando hagamos click, debe ser true
    setLoader(true);
  }

  return (
    <div>
      <h1>Cinema Paraíso</h1>
      <button onClick={buttonAlert}>{"Loading..."}</button>
      {buttonLoader === true && <Loader />}

      {/* {movies} son las peliculas */}
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
