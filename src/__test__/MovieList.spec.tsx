import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieList from '../components/movielist';
import  Movie  from '../models/Movie';

const movies: Movie[] = [
  {
    adult: false,
    backdrop_path: '/path1.jpg',
    genres: ['Action', 'Adventure'],
    genre_ids: [28, 12],
    id: 1,
    original_language: 'en',
    original_title: 'Movie 1',
    overview: 'Overview 1',
    popularity: 10,
    poster_path: '/poster1.jpg',
    release_date: '2021-01-01',
    title: 'Movie 1',
    video: false,
    vote_average: 8,
    vote_count: 100,
  },
  // Add more movie objects as needed
];

test('test_movie_list_passes_correct_movie_prop', () => {
  const { getByText } = render(
    <MemoryRouter>
      <MovieList movies={movies} />
    </MemoryRouter>
  );

  // Check if the movie title is rendered
  expect(getByText('Movie 1')).toBeTruthy();
  // Add more assertions as needed
});