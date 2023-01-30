import React from "react";

const PokeInfo = ({
  index,
  name,
  imgUrl,
  type,
  height,
  weight,
  genderRate,
}) => {
  return (
    <div className={"grid grid-cols-3 bg-blue-500 p-4 gap-4 rounded-lg mx-4"}>
      <div className={"text-center bg-poke-blue rounded-xl p-4"}>
        <p className={"text-2xl"}>#{String(index).padStart(3, "0")}</p>
        <img className={"mx-auto h-60 mt-5"} src={imgUrl} alt="" />
        <p className="capitalize font-bold text-xl mt-5">{name}</p>
        <div className="flex justify-center">
          {type.map((type) => (
            <div className={`rounded-full p-2 m-2 mt-5 bg-${type.type.name}`}>
              <img
                className={"h-8"}
                src={`/src/assets/pokemonTypes/${type.type.name}.svg`}
                alt={type.type.name}
              />
            </div>
          ))}
        </div>
        <p className={"mt-5 text-lg"}>Height: {height / 10} m</p>
        <p className={"text-lg"}>Weight: {weight / 10} kg</p>
        {/*<p>{genderRate}</p>*/}
      </div>
      <div className={"col-span-2 bg-blue-300"}>
        <div>02</div>
        <div>03</div>
      </div>
    </div>
  );
};

export default PokeInfo;
