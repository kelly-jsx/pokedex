import React, { useState } from "react";
import axios from "axios";

import GitHub from "./components/GitHub";
import Header from "./components/Header/Header";
import PokeCard from "./components/PokeCard";

function App() {
  const [pokemon, setPokemon] = useState({});
  axios
    .get("https://pokeapi.co/api/v2/pokemon/bulbasaur")
    .then(function (response) {
      const data = response.data;
      setPokemon({
        index: data.id,
        name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
        imgUrl: data.sprites.other.dream_world.front_default,
      });
    });

  return (
    <div className="App m-2">
      <GitHub />
      <Header />
      <div className="poke-list flex mt-2 bg-slate-600">
        <PokeCard
          key={pokemon.index}
          index={pokemon.index}
          name={pokemon.name}
          imgUrl={pokemon.imgUrl}
        />
      </div>
    </div>
  );
}

export default App;
