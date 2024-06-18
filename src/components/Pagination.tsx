// componente debe recibir el número de página actual y el número total de páginas como props.
// El componente ejecutar un callback cuando un usuario selecciona una nueva página.
import React from "react";

interface PaginationProps {
  //numero de pagina actual
  currentPage: number;
  //numero total de paginas
  totalPage: number;
  //funcion callback tomara un numero pagina como argumento
  //no produce ningún resultado y simplemente realiza ciertas acciones
  onSelectPage: (numberPage: number) => void;
}

//1. iterar desde la primera pagina a la ultima
//2. generar un boton por cada pagina
//3.

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPage,
  onSelectPage,
}) => {
  // Crear un array para almacenar los botones de paginación
  const pageButtons = [];

  // bucle for para generar los botones
  for (let i = 1; i <= totalPage; i++) {
    pageButtons.push(
      <button
        //número de página como texto del botón {i}.
        key={i}
        //Un manejador de evento onClick={() => onSelectPage(i)} que llama a onSelectPage con el número de página correspondiente.
        onClick={() => onSelectPage(i)}
        //compara el número de la página actual (currentPage) con el número de página del botón (i).
        //active:forma abreviada de una declaración if-else.
        className={`pagination-button__button ${currentPage === i ? 'active' : ''}`}

>
        {i}
      </button>
    );
  }

  return (
    <div className="pagination-container">
      <div className="pagination-button">{pageButtons}</div>
    </div>
  );
};

export default Pagination;
