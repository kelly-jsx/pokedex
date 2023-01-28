import React from "react";
import Logo from "../../assets/pokemon.svg";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <div
      className={
        "flex flex-col w-screen justify-center items-center text-center mt-2"
      }
    >
      <img src={Logo} alt="Pokemon Logo" className="w-3/4 md:w-1/2 lg:w-1/5" />
      <SearchBar />
    </div>
  );
};

export default Header;
