import React from "react";

const PokeCard = (pokemon, name) => {
  return (
    <div className="poke-card text-center bg-blue-500 rounded-2xl m-1 p-3">
      <p>#{pokemon.index}</p>
      <img className={"mx-auto"} src={pokemon.imgUrl} alt="" />
      <p className="capitalize font-bold">{pokemon.name}</p>
      <p className="capitalize font-bold">{pokemon.types}</p>
    </div>
  );
};

export default PokeCard;
