import React from "react";
import GitHubLogo from "../assets/github.svg";

const GitHub = () => {
  return (
    <div className={"fixed bottom-5 right-5"}>
      <a
        href="https://github.com/kelly-jsx/pokedex"
        target="_blank"
        rel="noreferrer"
      >
        <img className={"w-11"} src={GitHubLogo} alt="Github Icon" />
      </a>
    </div>
  );
};

export default GitHub;
