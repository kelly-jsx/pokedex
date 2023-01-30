import React from "react";
import Logo from "../../assets/pokemon.svg";
import SearchBar from "./SearchBar";

const Header = (props) => {
  return (
    <div
      className={
        "flex flex-col w-screen justify-center items-center text-center"
      }
    >
      <img
        src={Logo}
        alt="Pokemon Logo"
        className="w-3/4 md:w-1/2 lg:w-1/5 mt-5"
      />
      <SearchBar onSearchChange={props.onSearchChange} />
    </div>
  );
};

export default Header;
