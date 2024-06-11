import { render, waitFor, screen } from "@testing-library/react";
import Home from "../page/Home"
import { getMovies } from "../services/APIService";

// Simulamos las respuestas de la API utilizando Jest mocks
jest.mock("../services/APIService");

describe("Pruebas de integración para el componente Home", () => {
  // Simulamos datos de películas
  const mockMovies = [
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
  ];

  beforeEach(() => {
    // Configuramos el mock para devolver los datos de películas simulados
    (getMovies as jest.Mock).mockResolvedValue(mockMovies);
  });


  test("Renderiza un mensaje cuando no hay películas disponibles", async () => {
    // Configuramos el mock para devolver una lista vacía de películas
    (getMovies as jest.Mock).mockResolvedValue([]);

    // Renderizamos el componente Home
    render(<Home />);

    // Esperamos a que se cargue el mensaje de películas no disponibles
    await waitFor(() => {
      // Verificamos que se muestra el mensaje adecuado
      expect(
        screen.getByText("No hay películas disponibles en este momento")
      ).toBeInTheDocument();
    });

    // Podríamos agregar más aserciones aquí si es necesario
  });
});
