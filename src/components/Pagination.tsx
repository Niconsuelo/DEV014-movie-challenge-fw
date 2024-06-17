// componente debe recibir el número de página actual y el número total de páginas como props.
// El componente ejecutar un callback cuando un usuario selecciona una nueva página.
import React from "react";

interface PaginateProps {
  //numero de pagina actual
  currentPage: number;
  //numero total de paginas
  totalPage: number;
  //funcion callback tomara un numero pagina como argumento
  //no produce ningún resultado y simplemente realiza ciertas acciones
  onSelectPage: (numberPage: number) => void;
}

const Pagination: React.FC<PaginateProps> = ({
  currentPage,
  totalPage,
  onSelectPage,
}) => {
    //ejecutará cuando se haga clic en un botón de página.
    //llama a la función onSelectPage con el número de página como argumento.
  const clickPagination = (numberPage: number) => {
    onSelectPage(numberPage);
  };

  return (
    <div className="pagination-container">
    <div className="pagination">
    <a href="#">1</a>
    <a href="#" className="active">2</a>
    <a href="#">3</a>
      {/* Mostrar botones de página */}
      {Array.from({ length: totalPage }, (_, index) => index + 1).map(numberPage => (
        <button
          key={numberPage}
          onClick={() => clickPagination(numberPage)}
          className={currentPage === numberPage ? 'active' : ''}
        >
          {numberPage}
        </button>
      ))}
    </div>
    </div>
  );
};
export default Pagination;
