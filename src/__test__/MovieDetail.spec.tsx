import { render } from '@testing-library/react';
import MovieDetail from '../components/MovieDetail';
import Movie from '../models/Movie';

describe('MovieDetail Component', () => {
  const movie: Movie = {
    adult: false,
    backdrop_path: '/path/to/backdrop.jpg',
    genres: ['Action', 'Adventure'],
    genre_ids: [28, 12],
    id: 1,
    original_language: 'en',
    original_title: 'Test Movie',
    overview: 'This is a test movie overview.',
    popularity: 123.45,
    poster_path: '/path/to/poster.jpg',
    release_date: '2023-01-01',
    title: 'Test Movie',
    video: false,
    vote_average: 8.5,
    vote_count: 1000,
  };

  it('should render the movie\'s poster image correctly using the provided `poster_path`', () => {
    const { getByAltText } = render(<MovieDetail movie={movie} />);
    const imgElement = getByAltText(movie.title) as HTMLImageElement;
    expect(imgElement).toBeTruthy();
    expect(imgElement.src).toBe(`https://image.tmdb.org/t/p/w500/${movie.poster_path}`);
  });

  it('should display the movie\'s title and popularity correctly', () => {
    const { getByText } = render(<MovieDetail movie={movie} />);
    expect(getByText(movie.original_title)).toBeTruthy();
    expect(getByText(movie.popularity.toString())).toBeTruthy();
  });

  it('should handle cases where the `poster_path` is missing or invalid', () => {
    const movieWithInvalidPosterPath = { ...movie, poster_path: '' };
    const { getByAltText } = render(<MovieDetail movie={movieWithInvalidPosterPath} />);
    const imgElement = getByAltText(movie.title) as HTMLImageElement;
    expect(imgElement).toBeTruthy();
    expect(imgElement.src).toBe('https://image.tmdb.org/t/p/w500/');
  });
});