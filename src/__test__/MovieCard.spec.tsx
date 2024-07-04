import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Movie from '../models/Movie';
import MovieCard from '../components/MovieCard';

const mockMovie: Movie = {
  adult: false,
  backdrop_path: "/path/to/backdrop.jpg",
  genres: ["Action", "Adventure"],
  genre_ids: [28, 12],
  id: 12345,
  original_language: "en",
  original_title: "Test Movie",
  overview: "This is a test movie.",
  popularity: 10,
  poster_path: "/path/to/poster.jpg",
  release_date: "2022-01-01",
  title: "Test Movie",
  video: false,
  vote_average: 8.5,
  vote_count: 1000,
};

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('MovieCard Component', () => {
  test('test_movie_card_navigation', () => {
    render(
      <MemoryRouter>
        <MovieCard movie={mockMovie} />
      </MemoryRouter>
    );

    const movieCard = screen.getByRole('listitem');
    fireEvent.click(movieCard);

    expect(mockNavigate).toHaveBeenCalledWith(`/movie/${mockMovie.id}`);
  });

  test('test_movie_card_missing_poster_path', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: '' };
  
    render(
      <MemoryRouter>
        <MovieCard movie={movieWithoutPoster} />
      </MemoryRouter>
    );
  
    const imageElement = screen.getByRole('img');
    expect(imageElement.getAttribute('src')).toBe('https://image.tmdb.org/t/p/w500/');
  })
});