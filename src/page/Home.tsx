// src/App.tsx
//define peliculas y pasa a componentes.

import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";
import "../styles/MovieList.css"
import "../styles/NavBar.css"
import { getMovies } from "../services/APIService";
import Movie from "../models/Movie";
import MovieList from "../components/Movielist";
import Loader from "../components/LoaderAPI";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//app es un componente de tipo funcion de reactx
//useState variable de react
const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  useEffect(() => {
    setIsLoading(true);
    const id = toast.loading("Please wait...")
    getMovies().then((movies: Movie[]) => {
      setMovies(movies);
      toast.update(id, { render: "¡Bienvenido! La página se ha cargado con éxito.", type: "success", isLoading: false });
    
    }).catch ((error) => {
      toast.update(id, { render: error.message, type: "error", isLoading: false });

    }).finally(() => {
      setIsLoading(false);

    })
  },[])


  return (
    <div>
      <h1>descubre los clásicos de culto en cinema paraíso</h1>
      <div className="container-nav-bar">hola1</div>
      {isLoading && <Loader />}

      {/* {movies} son las peliculas */}
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
