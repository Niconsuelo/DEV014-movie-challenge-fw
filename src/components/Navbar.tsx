import React from "react";
import ButtonNav from "./ButtonNav";
import "../styles/ButtonNav.css";
import ListOptions from "../components/ListOptions";
import GenresOptions from "../models/GenresOptions";
import "../styles/NavBar.css";

interface NavBarProps {
  genreOptionProps: GenresOptions[];
  onChangeProps: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectOption: GenresOptions | null;
  onClick: () => void;
  selectorSort: GenresOptions[];
  OnChangeSortBy: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  sortBy: GenresOptions | null;
}

const NavBar: React.FC<NavBarProps> = ({
  genreOptionProps,
  onChangeProps,
  selectOption,
  onClick,
  selectorSort,
 OnChangeSortBy,
 sortBy,

}) => {
  /* lo que pasara al hacer click en button del nav
  function handleClick() {
    alert("hiciste click en el primer button de nav bar");
  }
  */

  return (
    <div className="container-nav-bar">
      <ButtonNav text="Ir al inicio" onClick={onClick} />
      <ListOptions
        options={genreOptionProps}
        onChangeOption={onChangeProps}
        selected={selectOption}
        name="Generos"
      />
      <ListOptions
        options={selectorSort}
        onChangeOption={OnChangeSortBy}
        selected={sortBy}
        name="Ordenar Por"
      />
      <ButtonNav text="Limpiar filtros" onClick={onClick} />
   
    </div>
  );
};

export default NavBar;
