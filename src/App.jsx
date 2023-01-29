import React from "react";
import axios from "axios";

import GitHub from "./components/GitHub";
import Header from "./components/Header/Header";
import PokeCard from "./components/PokeCard";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPokemons: [],
      pokemon: {
        index: "",
        name: "",
        imgUrl: "",
      },
    };
  }

  componentDidMount() {
    this.getPokemonInfo();
  }

  getPokemonInfo = async () => {
    await axios
      .get("https://pokeapi.co/api/v2/pokemon/bulbasaur")
      .then((response) => {
        const data = response.data;
        console.log(response.data);
        this.setState({
          pokemon: {
            index: data.id,
            name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
            imgUrl: data.sprites.other.dream_world.front_default,
          },
        });
      });
  };

  render() {
    return (
      <div className="App m-2">
        <GitHub />
        <Header />
        <div className="poke-list flex mt-2 bg-slate-600">
          <PokeCard
            key={this.state.pokemon.index}
            index={this.state.pokemon.index}
            name={this.state.pokemon.name}
            imgUrl={this.state.pokemon.imgUrl}
          />
        </div>
      </div>
    );
  }
}

export default App;
