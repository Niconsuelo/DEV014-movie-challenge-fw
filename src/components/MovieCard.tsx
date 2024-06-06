import Movie from "../models/Movie";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const base_url = "https://image.tmdb.org/t/p/w500/";
  const fullImageUrl = `${base_url}${movie.poster_path}`;

  return (
    <li className="container-card-movie">
      <div className="container-card-image-movie">
        <img src={fullImageUrl} className="movie-image" />
      </div>
      <div className="text-card-movie">
        <p className="text-card-title">{movie.original_title}</p>
        <p className="text-card-year">{movie.release_date}</p>
      </div>
    </li>
  );
};

export default MovieCard;
