import React from "react";
import Movie from "../models/Movie";
import "../styles/MovieDetail.css";

interface MovieDetailProps {
  movie: Movie;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie }) => {
  const base_url = "https://image.tmdb.org/t/p/w500/";
  const fullImageUrl = `${base_url}${movie.poster_path}`;

  return (
    <div>
      <div className="container-detail">
        <div className="container-movie-details">
          <div className="container-movie-image">
            <img className="img-movie-details" src={fullImageUrl} alt={movie.title}/>
          </div>

          <div className="container-movie-text">
            <div className="align-title">
              <p className="title-movie-details">{movie.original_title}</p>
              <p className="text-movie-details">{movie.popularity}</p>
            </div>

            <div className="container-details">
              <div className="align-movie-details">
                <h3>Release date:</h3>
                <p className="text-movie-details">{movie.release_date}</p>
              </div>

              <div className="align-movie-details">
                <h3>Overview:</h3>
                <p className="text-movie-details">{movie.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
