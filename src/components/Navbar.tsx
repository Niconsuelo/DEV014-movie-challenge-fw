import React from "react";
import ButtonNav from "./ButtonNav";
import "../styles/ButtonNav.css";
import ButtonSearch from "./ButtonSearch";
import ListOptions from "../components/ListOptions";
import GenresOptions from "../models/GenresOptions";
import "../styles/NavBar.css";

interface NavBarProps {
  genreOptionProps: GenresOptions[];
  onChangeProps: (e: any) => void;
  selectOption: GenresOptions | null;
onClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({
  genreOptionProps,
  onChangeProps,
  selectOption,
  onClick,
}) => {
  /* lo que pasara al hacer click en button del nav
  function handleClick() {
    alert("hiciste click en el primer button de nav bar");
  }
  */

  return (
    <div className="container-nav-bar">
      

      <ListOptions
        options={genreOptionProps}
        onChangeOption={onChangeProps}
        selected={selectOption}
      />
     
      <ListOptions
        options={genreOptionProps}
        onChangeOption={onChangeProps}
        selected={selectOption}
      />
      <ButtonNav text="Ir al inicio" onClick={onClick} />
      <ButtonNav text="Mejor puntuación" onClick={onClick}/>
      <ButtonSearch />
    </div>
  );
};

export default NavBar;
