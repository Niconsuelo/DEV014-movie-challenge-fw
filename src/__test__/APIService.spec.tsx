import fetchMock from "jest-fetch-mock";
import type { MovieFilters } from "../models/MovieFilters";
import {
  getMovieDetail,
  getMovieGenres,
  getMovies,
} from "../services/APIService";
import { ListPaginationMovie } from "../models/ListPaginationMovie";
import ApiMovieResult from "../models/ApiMovieResult";
import ApiMovieGenres from "../models/ApiMovieGenres";
import GenreList from "../models/GenreList";
import { formatMovie } from "../utils/transformers";
import Movie from "../models/Movie";

//test getMovies
describe("getMovies", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  const genreMap = new Map<number, string>([
    [28, "Action"],
    [12, "Adventure"],
  ]);

  const apiMovieResult: ApiMovieResult = {
    adult: false,
    backdrop_path: "/path.jpg",
    genre_ids: [28, 12],
    id: 1,
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

  const apiMovieList = {
    page: 1,
    results: [apiMovieResult],
    total_pages: 1,
    total_results: 1,
  };

  // Testing getMovies with valid filters and different genreId
  test("test_getMovies_with_different_genreId", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(apiMovieList));

    const filters: MovieFilters = {
      page: 1,
      genreId: 12,
      sortBy: "popularity.desc",
    };
    const result: ListPaginationMovie = await getMovies(filters, genreMap);

    expect(result.metaData.pagination.currentPage).toBe(1);
    expect(result.metaData.pagination.totalPages).toBe(1);
    expect(result.movies.length).toBe(1);
    expect(result.movies[0].title).toBe("Test Movie");
    expect(result.movies[0].genres).toEqual(["Action", "Adventure"]);
  });

  test("test_getMovies_with_valid_filters", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(apiMovieList));

    const filters: MovieFilters = {
      page: 1,
      genreId: 28,
      sortBy: "popularity.desc",
    };
    const result: ListPaginationMovie = await getMovies(filters, genreMap);

    expect(result.metaData.pagination.currentPage).toBe(1);
    expect(result.metaData.pagination.totalPages).toBe(1);
    expect(result.movies.length).toBe(1);
    expect(result.movies[0].title).toBe("Test Movie");
    expect(result.movies[0].genres).toEqual(["Action", "Adventure"]);
  });

  test("test_getMovies_fetch_failure", async () => {
    fetchMock.mockRejectOnce(new Error("Network Error"));

    const filters: MovieFilters = {
      page: 1,
      genreId: 28,
      sortBy: "popularity.desc",
    };

    await expect(getMovies(filters, genreMap)).rejects.toThrow("Network Error");
  });
});

//test movieGenres
describe("getMovieGenres", () => {
  const mockApiMovieGenres: ApiMovieGenres = {
    genres: [
      { id: 1, name: "Action" },
      { id: 2, name: "Comedy" },
    ],
  };

  const mockGenreList: GenreList = {
    genreMap: new Map([
      [1, "Action"],
      [2, "Comedy"],
    ]),
    genreOption: [
      { value: "1", label: "Action" },
      { value: "2", label: "Comedy" },
    ],
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return a GenreList object containing a map of genre IDs to names and an array of genre options", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockApiMovieGenres,
    });

    const result = await getMovieGenres();

    expect(result).toEqual(mockGenreList);
  });

  it("should handle HTTP errors gracefully and throw an appropriate error message", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    await expect(getMovieGenres()).rejects.toThrow(
      "Lo sentimos, pero no pudimos cargar la página. Intenta nuevamente más tarde"
    );
  });
});

//test getDetail

describe("getMovieDetail", () => {
  const genreMap = new Map<number, string>([
    [28, "Action"],
    [12, "Adventure"],
  ]);

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should successfully fetch and return movie details when provided with a valid movie ID and genre map", async () => {
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

    const expectedMovie: Movie = formatMovie(apiMovie, genreMap);

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(apiMovie),
    });

    const movie = await getMovieDetail(123, genreMap);
    expect(movie).toEqual(expectedMovie);
  });


  it("should handle HTTP errors gracefully and throw an appropriate error message", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(getMovieDetail(123, genreMap)).rejects.toThrow(
      "Lo sentimos, pero no pudimos cargar la página. Intenta nuevamente más tarde"
    );
  });
});
