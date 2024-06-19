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
import NavBar from "../components/Navbar";
import { useSearchParams } from "react-router-dom";

//app es un componente de tipo funcion de reactx
//useState variable de react
//set cambia asignar.
const Home: React.FC = () => {
  //definicion, manejo de estado del componente
  //movieslistado, isloadingcontrola estado de carga loader, totalpagemovie nº paginas disponible, currenpage guarda pagina actual
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //es 0 porque no existe paginas inicialmente
  const [totalPageMovie, setTotalPageMovie] = useState<number>(0);
  const [currentPageMovie, setCurrentPageMovie] = useState<number>(1);
  //useSearchParams permite leer y manipular los parametros de consulta url
  //search, obj contiene parametro consulta actual url
  //setsearchpaams actualiza parametro de consulta url
  const [searchParams, setSearchParams] = useSearchParams();


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

  //lee el parámetro page de la URL y actualizar currentPageMovie
  useEffect(() => {
    //searchparams Obtiene el valor del parámetro page de los parámetros de consulta.
    const page = searchParams.get("page");
    if (page) {
      // Actualiza el estado de la página actual si 'currentPage' existe
      setCurrentPageMovie(parseInt(page, 10));
    }
  }, [searchParams]);



  //carga datos api
   // Efecto que se ejecuta cuando currentPageMovie cambia
  useEffect(() => {
    setIsLoading(true);

    const id = toast.loading("Por favor espere...");

    getMovies({ page: currentPageMovie }) // Llama a la API para obtener las películas de la página actual
      .then((data: ListPaginationList) => {
        const movies = data.movies;
        setMovies(movies);
        //despues de setear peliculas,
        //busca total page y con ello sera reactivo, asara al hijo pagination que cambiara
        //setTotalPageMovie(data.metaData.pagination.totalPages);
        //al ingresar los datos que me entrega promise, me trae 5400 paginas.
        setTotalPageMovie(10);// Establece el número total de páginas (aquí está fijo a 10 para el ejemplo)

        //agregamos 1 segundo antes que cargue la notificacion existosa
        setTimeout(() => {
          toast.update(id, {
            render: "¡Bienvenido! La página se ha cargado con éxito.",
            type: "success",
            isLoading: false,
            autoClose: 1000,
          });
        }, 1000);
      })

      .catch((error) => {
        setTimeout(() => {
          toast.update(id, {
            render: error.message,
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }, 1000);
      })
      .finally(() => {
        setIsLoading(false);
      });
      // Dependencia en currentPageMovie asegura que getMovies se llama cada vez que cambia
  }, [currentPageMovie]);

  //onSelect toma un número como argumento y no retorna ningún valor (void).
  //pasar hSelectPageNumber como la prop onSelectPage al componente Pagination.
  return (
    <div>
      <h1>
        descubre los clásicos de culto en{" "}
        <span className="h1-black">cinema paraíso</span>
      </h1>
      <NavBar />
      
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
