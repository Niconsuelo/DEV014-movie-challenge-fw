import React from "react";
import Button from "./ButtonNav";
import "../styles/ButtonNav.css";
import ButtonSearch from "./ButtonSearch";
import SelectComponent from "./SelectNav";


const NavBar: React.FC = () => {
  //lo que pasara al hacer click en button del nav
  function handleClick() {
    alert("hiciste click en el primer button de nav bar");
  }

  return (
    <div className="container-nav-bar">
      <Button text="Button 1" onClick={handleClick} />
      <Button text="Button 2" onClick={handleClick} />
      <SelectComponent/>
      <SelectComponent/>
      <ButtonSearch/>
    </div>
  );
};

export default NavBar;
