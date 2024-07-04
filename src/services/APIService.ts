// Importaciones
import ApiMovieList from "../models/ApiMovieList";
import ApiMovieResult from "../models/ApiMovieResult";
import {
  formatGenresToMap,
  formatGenresToOptions,
  formatMovie,
} from "../utils/transformers";
import { MovieFilters } from "../models/MovieFilters";
import ListPaginationMovie from "../models/ListPaginationMovie";
import Metadata from "../models/MetaData";
import ApiMovieGenres from "../models/ApiMovieGenres";
import GenreList from "../models/GenreList";
import Movie from "../models/Movie";

// Constantes
const URL_API = "https://api.themoviedb.org/3";
const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMGNjOTZmMTllNzJiYTgxY2UxNWMxMWRkOWJkZjMxYiIsInN1YiI6IjY2NGNkYTI4YThhNThkY2I3YTZlYjIwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bY82hbPJncqfBkEZaG4ZifQPcyUFrYLk-QpIyaKg6Oc";
const url = `${URL_API}/discover/movie`;
const urlGenre = `${URL_API}/genre/movie/list`;


// Función para obtener películas con filtros
export function getMovies(
  filters: MovieFilters,
  genreMap: Map<number, string>
): Promise<ListPaginationMovie> {
  // Construir la URL del endpoint /discover/movie de The Movie DB
  if (!apiKey) {
    throw new Error("apiKey not found");
  }
  let urlGenreId = `${url}?page=${filters.page}`;
  //hacemos esto para evitar obtener peliculas que no tengan generos
  //almacena las keys concatenadas.
  let stringKey = "";
  //recorrer el Map para transformar key en cadena de string
  genreMap.forEach((_, key) => {
    //concatena cada key a stringKey, seguida de una coma y un espacio.
    stringKey += `${key}||`;
    //console.log(`${value}`);
  });
  //elimina la última coma y el espacio sobrantes usando slice.
  stringKey = stringKey.slice(0, -2);
  //console.log(stringKey); genres numeros

  //si no es igual a -1 seria igual a otro numero
  //muestra generos por numero
  if (filters.genreId !== -1) {
    //se debe ejecutar el fetch
    urlGenreId = urlGenreId + `&with_genres=${filters.genreId}`;
  } else {
    urlGenreId = urlGenreId + `&with_genres=${stringKey}`;
  }

  //todas las peliculas, deben ordenarse
  if (filters.sortBy) {
    urlGenreId = urlGenreId + `&sort_by=${filters.sortBy}`;
  }


  //console.log(filters.genreId);
  // Realiza una solicitud HTTP GET utilizando fetch y retornar la promesa
  return fetch(urlGenreId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`, // Ejemplo de header de autorización
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Lo sentimos, pero no pudimos cargar la página. Intenta nuevamente más tarde"
        );
      }
      return response.json();
    })
    .then((data: ApiMovieList) => {
      // Transforma cada película en un objeto Movie usando formatMovie.
      const movies = data.results.map((movie: ApiMovieResult) =>
        formatMovie(movie, genreMap)
      );

      // Se extrae la información de paginación y se guarda en metaData.
      const metaData: Metadata = {
        pagination: {
          currentPage: data.page,
          totalPages: data.total_pages,
        },
      };
      //
      return { metaData, movies };
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
      throw error;
    });
}

// Función para obtener géneros de películas
export function getMovieGenres(): Promise<GenreList> {
  if (!apiKey) {
    throw new Error("apiKey not found");
  }

  return fetch(`${urlGenre}`, {
    method: "GET", // Método de solicitud
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`, // Ejemplo de header de autorización
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Lo sentimos, pero no pudimos cargar la página. Intenta nuevamente más tarde"
        );
      }
      return response.json();
    })
    .then((data: ApiMovieGenres) => {
      // Transforma la lista de géneros en un Map
      const genreMap = formatGenresToMap(data.genres);
      const genreOption = formatGenresToOptions(data.genres);
      const responseObject = {
        genreMap,
        genreOption,
      };
      console.log(genreOption);
      console.log(genreMap);
      return responseObject;
    })
    .catch((error) => {
      console.error("Error fetching genres:", error);
      throw error;
    });
}


export function getMovieDetail(id: number, genreMap: Map<number, string>): Promise<Movie> {
  if (!apiKey) {
    throw new Error("apiKey not found");
  }
  return fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(
        "Lo sentimos, pero no pudimos cargar la página. Intenta nuevamente más tarde"
      );
    }
    return response.json();
  })
  .then((apiMovie: ApiMovieResult) => {
    // Pasar genreMap a formatMovie
    return formatMovie(apiMovie, genreMap);
  })
  .catch((error) => {
    console.error("Error fetching movie details:", error);
    throw error;
  });
}

