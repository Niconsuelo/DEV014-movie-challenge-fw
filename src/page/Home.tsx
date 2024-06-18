// src/App.tsx
//define peliculas y pasa a componentes.

import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";
import "../styles/MovieList.css";
import "../styles/NavBar.css";
import { getMovies } from "../services/APIService";
import Movie from "../models/Movie";
import Loader from "../components/LoaderAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MovieList from "../components/movielist";
import ListPaginationList from "../models/ListPaginationMovie";
import Pagination from "../components/Pagination";

//app es un componente de tipo funcion de reactx
//useState variable de react
//set cambia asignar.
const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //es 0 porque no existe paginas inicialmente
  const [totalPageMovie, setTotalPageMovie] = useState<number>(0);
  //en el padre se hacen las funciones
  //en el hijo se llaman
  //en el padre se declara para que sea reactivo

  //no retorna ningún valor (void), simplemente realiza una acción (en este caso, imprime en la consola).
  const SelectPageNumber = (numberPage: number) => {
    console.log(`Prueba: Página seleccionada: ${numberPage}`);
  };

  //variable react
  //

  useEffect(() => {
    setIsLoading(true);
    const id = toast.loading("Please wait...");
    //network consulta api
    getMovies({ page: 1 })
      .then((data: ListPaginationList) => {
        const movies = data.movies;
        setMovies(movies);
        //despues de setear peliculas,
        //busca total page y con ello sera reactivo, asara al hijo pagination que cambiara
        //setTotalPageMovie(data.metaData.pagination.totalPages);
        //al ingresar los datos que me entrega promise, me trae 5400 paginas.
        setTotalPageMovie(10);
        toast.update(id, {
          render: "¡Bienvenido! La página se ha cargado con éxito.",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      })
      .catch((error) => {
        toast.update(id, {
          render: error.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  //onSelect toma un número como argumento y no retorna ningún valor (void).
  //pasar hSelectPageNumber como la prop onSelectPage al componente Pagination.
  return (
    <div>
      <h1>descubre los clásicos de culto en cinema paraíso</h1>
      <div className="container-nav-bar">esta es mi navbar</div>
      {isLoading && <Loader />}

      {/* {movies} son las peliculas */}
      <MovieList movies={movies} />

      <Pagination
        currentPage={1}
        totalPage={totalPageMovie}
        onSelectPage={SelectPageNumber}
      />
            <div className="footer">© 2024 All Rights Reserved</div>

    </div>
    
  ); 
};

export default Home;
