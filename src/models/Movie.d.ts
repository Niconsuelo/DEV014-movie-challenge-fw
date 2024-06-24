//declara interfaz movie
//datos que quiero manejar en la interfaz
interface Movie {
  adult: boolean;
  backdrop_path: string;
  genres: string[];
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  }
  
  export default Movie;