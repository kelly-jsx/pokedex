import React from "react";

const PokeInfo = (pokemon) => {
  return (
    <div
      className={`${
        pokemon.isOpened ? "" : "invisible"
      } w-100 lg:w-3/4 mx-4 absolute lg:sticky inset-y-32 lg:top-12 lg:inset-x-40 lg:inset-y-28 items-center overflow-auto`}
    >
      <div
        className={
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-blue-500 p-4 gap-4 rounded-lg"
        }
      >
        <div className={"text-center col-span-1 bg-poke-blue rounded-xl p-4"}>
          <p className={"text-2xl"}>
            #{String(pokemon.index).padStart(3, "0")}
          </p>
          <img className={"mx-auto h-60 mt-5"} src={pokemon.imgUrl} alt="" />
          <p className="capitalize text-lg mt-5">{pokemon.category}</p>
          <p className="capitalize font-bold text-xl mt-5">{pokemon.name}</p>
          <div className="flex justify-center mt-5">
            {pokemon.type.map((type) => (
              <div className={`rounded-full p-2 m-2 bg-poke-yellow`} key={type}>
                <img
                  className={"h-8"}
                  src={`/src/assets/pokemonTypes/${type.type.name}.svg`}
                  alt={type.type.name}
                />
              </div>
            ))}
          </div>
          <div className="mt-5 text-lg">
            <p className={"text-lg"}>
              <b>Height:</b> {pokemon.height / 10} m
            </p>
          </div>
          <p className={"text-lg"}>
            <b>Weight:</b> {pokemon.weight / 10} kg
          </p>
          {/*<p>{genderRate}</p>*/}
        </div>

        <div
          className={
            "col-span-1 lg:col-start-2 lg:col-span-3 bg-blue-400 rounded-xl p-3 text-lg"
          }
        >
          <p className={"font-bold"}>About:</p>
          <p>{pokemon.description}</p>
          <p className={"font-bold mt-4"}>Abilities:</p>
          <ul className={"list-disc pl-4 flex gap-8"}>
            {pokemon.abilities.map((ability) => (
              <li key={ability} className={"capitalize"}>
                {ability.ability.name}
              </li>
            ))}
          </ul>
          <p className={"font-bold mt-4"}>Base Stats:</p>
          <div className="grid grid-cols-3">
            {pokemon.stats.map((stats) => (
              <p className={"uppercase"}>
                <b>{stats.stat.name}:</b>
                <p className={"text-black mb-2"}>{stats.base_stat}</p>
              </p>
            ))}
          </div>
          {/*<p className={"font-bold mt-4"}>Evolution:</p>*/}
          {/*<div className="grid grid-cols-3 text-center">*/}
          {/*  <h1>Bulbasaur</h1>*/}
          {/*  <h1>Ivysaur</h1>*/}
          {/*  <h1>Venusaur</h1>*/}
          {/*</div>*/}
        </div>
        <div className="min-w-full md:hidden flex flex-col items-center">
          <button
            className="cursor-pointer rounded-lg bg-poke-yellow w-32 h-10 mt-2"
            onClick={pokemon.onClickHandle}
          >
            X CLOSE
          </button>
        </div>
      </div>
      <div className="min-w-full hidden md:flex flex-col items-center">
        <button
          className="transition ease-in-out cursor-pointer rounded-lg bg-poke-yellow hover:bg-red-600 duration-300 w-32 h-10 mt-2"
          onClick={pokemon.onClickHandle}
        >
          X CLOSE
        </button>
      </div>
    </div>
  );
};

export default PokeInfo;
