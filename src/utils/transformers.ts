// src/utils/transformers.ts
//la transformacion de datos adapta datos recibidos de la API "ApiMovie" a otro mas conveniente Movie
// Definición del modelo de negocio Movie
import ApiMovieResult from "../models/ApiMovieResult";
import Movie from "../models/Movie";
import MovieGenres from "../models/MovieGenres";

// Función para transformar los datos de la API al modelo de negocio
//Movie es la estructura del objeto que devolvera
//Movie es un nuevo objeto, usa datos del apiMovie para llenar las propiedades del objeto Movie

/*
definición del tipo del parámetro de entrada de la función.
parámetro sea un objeto que cumpla con la interfaz ApiMovieResult
*/

//apiMovie, que es un objeto de tipo ApiMovieResult, y genreMap, que es un Map<number, string> generado por formatGenresToMap.
export function formatMovie(apiMovie: ApiMovieResult, genreMap: Map<number, string>): Movie {
  const movie: Movie = {
    adult: apiMovie.adult,
    backdrop_path: apiMovie.backdrop_path,
    genre_ids: apiMovie.genre_ids,
    id: apiMovie.id,
    original_language: apiMovie.original_language,
    original_title: apiMovie.original_title,
    overview: apiMovie.overview,
    popularity: apiMovie.popularity,
    poster_path: apiMovie.poster_path,
    release_date: apiMovie.release_date,
    title: apiMovie.title,
    video: apiMovie.video,
    vote_average: apiMovie.vote_average,
    vote_count: apiMovie.vote_count,
    genres: [],
  };

  // Mapear genre_ids a nombres de géneros usando genreMap
  movie.genres = apiMovie.genre_ids.map(id => genreMap.get(id)).filter(Boolean) as string[];

  return movie;
}

export function formatGenresToMap(movieGenre: MovieGenres[]): Map<number, string> {
  const mapMovieGenres = new Map<number, string>();

  movieGenre.forEach(movieGenre => {
    mapMovieGenres.set(movieGenre.id, movieGenre.name)
  })
  return mapMovieGenres;
 
}
