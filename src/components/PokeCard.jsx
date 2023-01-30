import React from "react";
import "react-tooltip/dist/react-tooltip.css";

const PokeCard = ({ id, image, name, type }) => {
  let finalColor;
  let finalColor2;

  if (type.length === 2) {
    finalColor = type[0].type.name;
    finalColor2 = type[1].type.name;
  } else {
    finalColor = type[0].type.name;
    finalColor2 = type[0].type.name;
  }

  return (
    <div
      className={`poke-card cursor-pointer text-center bg-gradient-to-b from-${finalColor} to-${finalColor2} rounded-2xl m-3 p-3
       transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-1
        `}
    >
      <p>#{String(id).padStart(3, "0")}</p>
      <img className={"mx-auto h-60"} src={image} alt="" />
      <p className="capitalize font-bold">{name}</p>
      <div className="flex justify-center">
        {type.map((type) => (
          <div className={`rounded-full p-2 m-2 mt-5 bg-${type.type.name}`}>
            {/*<p>{type.type.name}</p>*/}
            <img
              className={"h-8"}
              src={`/src/assets/pokemonTypes/${type.type.name}.svg`}
              alt={type.type.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokeCard;
