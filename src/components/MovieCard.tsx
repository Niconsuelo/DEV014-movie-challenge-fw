import Movie from "../models/Movie";
import "../styles/MovieCard.css";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const base_url = "https://image.tmdb.org/t/p/w500/";
  const fullImageUrl = `${base_url}${movie.poster_path}`;

// Convertir release_date a un objeto Date y obtener el año
const releaseYear = new Date(movie.release_date).getFullYear();

  return (
    <li className="container-card-movie">
      <div className="container-card-image-movie">
        <img src={fullImageUrl} className="movie-image" />
      </div>
      <div className="text-card-movie">
        <p className="text-card-title">{movie.original_title}</p>
        <p className="text-card-year">{releaseYear}</p>
      </div>
    </li>
  );
};

export default MovieCard;
