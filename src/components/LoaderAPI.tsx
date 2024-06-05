import React from "react";
import "../styles/LoaderAPI.css"; // Estilos opcionales para el loader

const Loader: React.FC = () => {
  return (
    <div className="background-loader">
      <div className="loader">
        <div className="loaderBar"></div>
      </div>
    </div>
  );
};

export default Loader;
