// src/App.tsx
//define peliculas y pasa a componentes.

import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";
import "../styles/MovieList.css";
import "../styles/NavBar.css";
import { getMovieGenres, getMovies } from "../services/APIService";
import Movie from "../models/Movie";
import Loader from "../components/LoaderAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MovieList from "../components/movielist";
import ListPaginationList from "../models/ListPaginationMovie";
import Pagination from "../components/Pagination";
import NavBar from "../components/Navbar";
import { useSearchParams } from "react-router-dom";
import GenreList from "../models/GenreList";

//app es un componente de tipo funcion de reactx
//useState variable de react
//set cambia asignar.
const Home: React.FC = () => {
  //definicion, manejo de estado del componente
  //movieslistado, isloadingcontrola estado de carga loader, totalpagemovie nº paginas disponible, currenpage guarda pagina actual
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //es 0 porque no existe paginas inicialmente
  const [totalPageMovie, setTotalPageMovie] = useState<number>(0);
  const [currentPageMovie, setCurrentPageMovie] = useState<number>(
    page ? Number(page) : 1
  );
  //useSearchParams permite leer y manipular los parametros de consulta url
  //search, obj contiene parametro consulta actual url
  //setsearchpaams actualiza parametro de consulta url
  const [firstLoad, setFirstLoad] = useState<boolean>(false);
  const [genres, setGenres] = useState<Map<number, string>>(new Map());

  //en el padre se hacen las funciones
  //en el hijo se llaman
  //en el padre se declara para que sea reactivo

  //CONSTRUCCION QUERYPARAMS
  //actualiza currentpage con nº de pagina seleccionado
  const SelectPageNumber = (numberPage: number) => {
    // numberpage es pagina seleccionada
    setCurrentPageMovie(numberPage);
    //Actualiza los parámetros de consulta en la URL con el nuevo número de página.
    setSearchParams({ page: numberPage.toString() });
    console.log(`Prueba: Página seleccionada: ${numberPage}`);
  };

  useEffect(() => {
    getMovieGenres()
      .then((data: GenreList) => {
        setGenres(data.genreMap);
      })
      .catch((error) => {
        toast.error(error.message)
      });
  }, []);

  //lee el parámetro page de la URL y actualizar currentPageMovie

  //carga datos api
  // Efecto que se ejecuta cuando currentPageMovie cambia
  useEffect(() => {
    if (genres.size > 0) {
      setIsLoading(true);

      const id = toast.loading("Por favor espere...");

      getMovies({ page: currentPageMovie }, genres) // Llama a la API para obtener las películas de la página actual
        .then((data: ListPaginationList) => {
          const movies = data.movies;
          setMovies(movies);
          //despues de setear peliculas,
          //busca total page y con ello sera reactivo, asara al hijo pagination que cambiara
          //setTotalPageMovie(data.metaData.pagination.totalPages);
          //al ingresar los datos que me entrega promise, me trae 5400 paginas.
          setTotalPageMovie(10); // Establece el número total de páginas (aquí está fijo a 10 para el ejemplo)

          if (firstLoad === false) {
            toast.update(id, {
              render: "¡Bienvenido! La página se ha cargado con éxito.",
              type: "success",
              isLoading: false,
              autoClose: 1000,
            });
          } else {
            setTimeout(() => {
              toast.dismiss(id);
            }, 800);
          }

          setFirstLoad(true);
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
    }

    // Dependencia en currentPageMovie asegura que getMovies se llama cada vez que cambia
  }, [currentPageMovie, genres]);

  //onSelect toma un número como argumento y no retorna ningún valor (void).
  //pasar hSelectPageNumber como la prop onSelectPage al componente Pagination.

  return (
    <div className="container-home">
      <h1>
        descubre los clásicos de culto en{" "}
        <span className="h1-black">cinema paraíso</span>
      </h1>
      <NavBar />
      {/* <ModalDetailMovie/> */}
      {isLoading && <Loader />}

      {/* {movies} son las peliculas */}
      <MovieList movies={movies} />

      <Pagination
        currentPage={currentPageMovie}
        totalPage={totalPageMovie}
        onSelectPage={SelectPageNumber} // Pasa la función SelectPageNumber como prop a Pagination
      />

      <div className="footer">© 2024 All Rights Reserved</div>
    </div>
  );
};

export default Home;
