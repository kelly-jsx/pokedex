import React from "react";
import axios from "axios";

import GitHub from "./components/GitHub";
import Header from "./components/Header/Header";
import PokeCard from "./components/PokeCard";
import result from "postcss/lib/result";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPokemons: [],
      limit: 151,
      offset: 0,
      pokemon: {
        index: "",
        name: "",
        imgUrl: "",
      },
    };
  }

  componentDidMount() {
    // this.getPokemonInfo();
    this.getAllPokemons(this.state.offset, this.state.limit);
  }

  getAllPokemons = async (offset, limit) => {
    const response = await axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .catch((err) => console.log("Error:", err));
    this.getPokemonData(response.data.results);
  };

  getPokemonData = async (result) => {
    // debugger;

    const pokemonArr = [];

    await Promise.all(
      result.map((pokemonItem) => {
        return axios
          .get(`https://pokeapi.co/api/v2/pokemon/${pokemonItem.name}`)
          .then((result) => {
            pokemonArr.push(result.data);
          });
      })
    );

    pokemonArr.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));

    this.setState({
      isFilter: false,
      allPokemons: pokemonArr,
      showLoading: false,
    });
    console.log(this.state.allPokemons);
    // console.log("allPokes");
  };

  render() {
    return (
      <div className="App m-2">
        <GitHub />
        <Header />
        <div className="poke-list grid grid-cols-6 mt-2 bg-slate-600">
          {Object.keys(this.state.allPokemons).map((item) => (
            <PokeCard
              key={this.state.allPokemons[item].id}
              index={this.state.allPokemons[item].id}
              name={this.state.allPokemons[item].name}
              imgUrl={
                this.state.allPokemons[item].sprites.other.dream_world
                  .front_default
              }
              // type={this.state.pokemon.types}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
