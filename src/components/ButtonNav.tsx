import React from "react";
import "../styles/ButtonNav.css";

interface ButtonProps {
  //text button
  text: string;
  //fx q se ejecuta cuando se haga click
  onClick: () => void;

}
//componente react button
const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
      <div className="container-button">
        <button 
        onClick={onClick}
        className={`button-nav-bar`} >
            {text}
        </button>
    </div>
  );
};

export default Button;
