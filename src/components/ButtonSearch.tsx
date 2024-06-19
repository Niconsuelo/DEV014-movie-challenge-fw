import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "../styles/ButtonSearch.css";

const ButtonSearch: React.FC = () => {
  const SearchMovie = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Buscando!');
  };

  return (
    <form onSubmit={SearchMovie}>
       
       <div className="button-search-container">
        <input type="text" placeholder="Enter your movie" className="search-button" />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>
    </form>
  );
};

export default ButtonSearch;
