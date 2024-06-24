import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "../styles/ModalDetailMovie.css";
import Movie from "../models/Movie";

interface ModalDetailMovieProps {
  movie: Movie;
}

const ModalDetailMovie: React.FC<ModalDetailMovieProps> = ({ movie }) => {
  const base_url = "https://image.tmdb.org/t/p/w500/";
  const fullImageUrl = `${base_url}${movie.poster_path}`;
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div>
      <button onClick={onOpenModal}>Open modal</button>

      <Modal open={open} onClose={onCloseModal} center>
        <div className="container-movie-details">
          <div className="container-movie-image">
            <img className="img-movie-details" src={fullImageUrl} />
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
                <h3>Genres:</h3>
                <p className="text-movie-details">{movie.genre_ids}</p>
              </div>

              <div className="align-movie-details">
                <h3>Overview:</h3>
                <p className="text-movie-details">
                {movie.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalDetailMovie;
