import React from "react";

const PokeCard = (pokemon, name) => {
  return (
    <div className="poke-card text-center bg-blue-500 rounded-2xl m-3 p-3">
      <p>#{String(pokemon.index).padStart(3, "0")}</p>
      <img className={"mx-auto h-60"} src={pokemon.imgUrl} alt="" />
      <p className="capitalize font-bold">{pokemon.name}</p>
      {/*<p className="capitalize font-bold">{pokemon.types}</p>*/}
    </div>
  );
};

export default PokeCard;
