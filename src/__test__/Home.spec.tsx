// Importa las funciones necesarias
import { render, screen } from "@testing-library/react";
import Home from "../page/Home";

// Define un mock de getMovies
jest.mock("../services/APIService", () => ({
  getMovies: jest.fn().mockResolvedValue([
    {
      adult: false,
      backdrop_path: "/backdrop.jpg",
      genre_ids: [1, 2, 3],
      id: 123,
      original_language: "en",
      original_title: "Test Movie",
      overview: "This is a test movie",
      popularity: 123.45,
      poster_path: "/poster.jpg",
      release_date: "2023-01-01",
      title: "Test Movie",
      video: false,
      vote_average: 4.5,
      vote_count: 100,
    },
    { 
      adult: false,
      backdrop_path: "/fY3lD0jM5AoHJMunjGWqJ0hRteI.jpg",
      genre_ids: [878, 27, 28],
      id: 940721,
      original_language: "ja",
      original_title: "ゴジラ-1.0",
      overview:
        "In postwar Japan, Godzilla brings new devastation to an already scorched landscape. With no military intervention or government help in sight, the survivors must join together in the face of despair and fight back against an unrelenting horror.",
      popularity: 1408.634,
      poster_path: "/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg",
      release_date: "2023-11-03",
      title: "Godzilla Minus One",
      video: false,
      vote_average: 7.7,
      vote_count: 1355,
    },
    // Agrega más películas si es necesario
  ]),
}));

// Define la prueba
test("Renders the Home component and displays movies", async () => {
  // Renderiza el componente Home
  render(<Home />);

  // Espera a que las películas se carguen y se muestren en la pantalla
  await screen.findByText("Test Movie");
  await screen.findByText("ゴジラ-1.0");

  // Agrega aquí más expectativas según lo necesites
});
