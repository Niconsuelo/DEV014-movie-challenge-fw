import { useNavigate } from "react-router-dom";
import Movie from "../models/Movie";
import "../styles/MovieCard.css";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const base_url = "https://image.tmdb.org/t/p/w500/";
  const fullImageUrl = `${base_url}${movie.poster_path}`;

  //devuelve una función para navegar programáticamente a una nueva ubicación en la aplicación.
  const navigate = useNavigate(); // Obtener la función de navegación

  // se activa cuando el usuario hace clic en un elemento de la lista de películas.
  const MovieClick = () => {
    //Llama a navigate con la ruta /movie/:id, donde :id es el ID de la película seleccionada.
    navigate(`/movie/${movie.id}`); // Navegar a la ruta /movie/:id al hacer clic
  };

  // Convertir release_date a un objeto Date y obtener el año
  const releaseYear = new Date(movie.release_date).getFullYear();
  const genresString = movie.genres.join(", ");
  //se activa cuando se hace clic en la tarjeta de película.
  return (
    <li className="container-card-movie" onClick={MovieClick}>
      <div className="container-card-image-movie">
        <img src={fullImageUrl} className="movie-image" />
      </div>
      <div className="text-card-movie">
        <p className="text-card-title">{movie.original_title}</p>
        <p className="text-card-genres">{genresString}</p>
        <p className="text-card-year">{releaseYear}</p>
      </div>
    </li>
  );
};

export default MovieCard;
