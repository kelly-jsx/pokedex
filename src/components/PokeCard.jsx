import React from "react";
import "react-tooltip/dist/react-tooltip.css";

const PokeCard = ({ id, image, name, type, onClickHandle }) => {
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
    // <div
    //   className={`poke-card cursor-pointer text-center bg-gradient-to-b from-${finalColor} to-${finalColor2} rounded-2xl m-3 p-3
    //    transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-1
    //     `}
    // >
    <div
      className={`poke-card cursor-pointer text-center bg-poke-blue rounded-lg p-3
       transition ease-in-out hover:-translate-y-1.5 hover:scale-103 hover:bg-poke-yellow duration-300
        `}
      onClick={onClickHandle}
    >
      <p className={"text-2xl"}>#{String(id).padStart(3, "0")}</p>
      <img className={"mx-auto h-60 mt-5"} src={image} alt="" />
      <p className="capitalize font-bold mt-5 text-xl">{name}</p>
      <div className="flex justify-center mt-5">
        {type.map((type) => (
          <div className={`rounded-full p-2 m-2 bg-${type.type.name}`}>
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
