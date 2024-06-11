import { render, waitFor, screen } from "@testing-library/react";
import Home from "../page/Home"
import { getMovies } from "../services/APIService";

// Simulamos las respuestas de la API utilizando Jest mocks
jest.mock("../services/APIService");

describe("Pruebas de integración para el componente Home", () => {
  // Simulamos datos de películas
  const mockMovies = [
    { id: 1, title: "Pelicula 1" },
    { id: 2, title: "Pelicula 2" },
  ];

  beforeEach(() => {
    // Configuramos el mock para devolver los datos de películas simulados
    (getMovies as jest.Mock).mockResolvedValue(mockMovies);
  });

  test("Renderiza el componente Home y muestra las películas", async () => {
    // Renderizamos el componente Home
    render(<Home />);

    // Esperamos a que se carguen los datos de las películas
    await waitFor(() => {
      // Verificamos que el título de las películas se muestra en la pantalla
      expect(screen.getByText("Pelicula 1")).toBeInTheDocument();
      expect(screen.getByText("Pelicula 2")).toBeInTheDocument();
    });

    // Podríamos agregar más aserciones aquí para verificar otros elementos del componente si es necesario
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
