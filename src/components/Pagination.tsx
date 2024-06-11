// componente debe recibir el número de página actual y el número total de páginas como props. 
// El componente ejecutar un callback cuando un usuario selecciona una nueva página.
import React from "react";

interface PaginateProps {
    currentPage: number;
    totalPage: number;
  }

  const Pagination: React.FC<PaginateProps> = ({ currentPage, totalPage }) => {

    return (
        <div>
          {/* Aquí irá el contenido del componente de paginación */}
        </div>
      );
    };
    
    export default Pagination