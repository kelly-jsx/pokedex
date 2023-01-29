import React from "react";

const PokeCard = (pokemon) => {
  return (
    <div className="poke-card text-center">
      <p>#{pokemon.index}</p>
      <img src={pokemon.imgUrl} alt="" />
      <p>{pokemon.name}</p>
    </div>
  );
};

export default PokeCard;
