import { formatMovie } from "../utils/transformers";
import ApiMovieResult from "../models/ApiMovieResult";
import Movie from "../models/Movie";

describe("formatMovie", () => {
  it("should correctly map genre IDs to genre names using the provided genre map", () => {
    const apiMovie: ApiMovieResult = {
      adult: false,
      backdrop_path: "/path.jpg",
      genre_ids: [28, 12],
      id: 123,
      original_language: "en",
      original_title: "Test Movie",
      overview: "Test overview",
      popularity: 10,
      poster_path: "/poster.jpg",
      release_date: "2023-01-01",
      title: "Test Movie",
      video: false,
      vote_average: 8,
      vote_count: 100,
    };

    const genreMap = new Map<number, string>([
      [28, "Action"],
      [12, "Adventure"],
    ]);

    const expectedMovie: Movie = {
      ...apiMovie,
      genres: ["Action", "Adventure"],
    };

    const movie = formatMovie(apiMovie, genreMap);
    expect(movie).toEqual(expectedMovie);
  });
});
