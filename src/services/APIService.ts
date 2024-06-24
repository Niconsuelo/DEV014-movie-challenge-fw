// Importaciones
import ApiMovieList from "../models/ApiMovieList";
import ApiMovieResult from "../models/ApiMovieResult";
import { formatGenresToMap, formatMovie } from "../utils/transformers";
import { MovieFilters } from "../models/MovieFilters";
import ListPaginationMovie from "../models/ListPaginationMovie";
import Metadata from "../models/MetaData";
import getMovieGenres from "../models/MovieGenres";
import ApiMovieGenres from "../models/ApiMovieGenres";

// Constantes
const URL_API = "https://api.themoviedb.org/3";
const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMGNjOTZmMTllNzJiYTgxY2UxNWMxMWRkOWJkZjMxYiIsInN1YiI6IjY2NGNkYTI4YThhNThkY2I3YTZlYjIwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bY82hbPJncqfBkEZaG4ZifQPcyUFrYLk-QpIyaKg6Oc";
const url = `${URL_API}/discover/movie`;
const urlGenre = `${URL_API}/genre/movie/list`;

// Función para obtener películas con filtros
export function getMovies(filters: MovieFilters): Promise<ListPaginationMovie> {
  // Construir la URL del endpoint /discover/movie de The Movie DB
  if (!apiKey) {
    throw new Error("apiKey not found");
  }

  // Obtener géneros de películas
  return getMovieGenres()
    .then((genresMap) => {
      // Realiza una solicitud HTTP GET utilizando fetch y retornar la promesa
      return fetch(`${url}?page=${filters.page}`, {
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
        .then((data: ApiMovieList) => {
          // Transforma cada película en un objeto Movie usando formatMovie.
          const movies = data.results.map((movie: ApiMovieResult) =>
            formatMovie(movie, genresMap)
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
    })
    .catch((error) => {
      console.error("Error fetching movie genres:", error);
      throw error;
    });
}

// Función para obtener géneros de películas
export function getMovieGenres(): Promise<Map<number, string>> {
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
      const genresMap = formatGenresToMap(data.genres);
      return genresMap;
    })
    .catch((error) => {
      console.error("Error fetching genres:", error);
      throw error;
    });
}
