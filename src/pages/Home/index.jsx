import React, { useState } from "react";
import Properties from "../../components/Properties";
import "./style.css";

const Home = () => {
  const [city, setCity] = useState("");

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const searchByCity = (e) => {
    e.preventDefault();
  };

  return (
    <div className="body">
      <div className="jumbotron">
        <h1>Bienvenue sur ImmoTep</h1>
        <form onSubmit={searchByCity}>
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher par ville..."
              value={city}
              onChange={handleCityChange}
            />
            <button className="search-button" type="submit">
              Rechercher
            </button>
          </div>
        </form>
      </div>
      <Properties cityFilter={city} /> 
    </div>
  );
};

export default Home;
