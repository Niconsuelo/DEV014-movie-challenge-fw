import React from "react";
import Button from "./ButtonNav";
import "../styles/ButtonNav.css";
import ButtonSearch from "./ButtonSearch";
import ListOptions from "../components/ListOptions";
import GenresOptions from "../models/GenresOptions";

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
      <Button text="Ir al Inicio" onClick={onClick} />

      <ListOptions
        options={genreOptionProps}
        onChangeOption={onChangeProps}
        selected={selectOption}
      />
      <Button text="Button 2" onClick={onClick} />
      <ListOptions
        options={genreOptionProps}
        onChangeOption={onChangeProps}
        selected={selectOption}
      />
      <ButtonSearch />
    </div>
  );
};

export default NavBar;
