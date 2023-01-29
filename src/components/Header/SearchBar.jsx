import React from "react";

const SearchBar = (props) => {
  return (
    <form className="flex items-center mt-5 w-3/4 md:w-1/2 lg:w-1/3">
      <input
        type="text"
        id="simple-search"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-poke-blue focus:border-poke-blue block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search Pokemon"
        required
        onChange={props.onSearchChange}
      />
    </form>
  );
};

export default SearchBar;
