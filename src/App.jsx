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
      searchPokemons: [],
      isSearch: false,
      limit: 151,
      offset: 0,
      searchField: "",
    };
  }

  componentDidMount() {
    this.getAllPokemons(this.state.offset, this.state.limit);
  }

  getAllPokemons = async (offset, limit) => {
    const response = await axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .catch((err) => console.log("Error:", err));
    this.getPokemonData(response.data.results);
  };

  getPokemonData = async (result) => {
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
  };

  onSearchChange = (e) => {
    e.target.value.length > 0
      ? this.setState({ isSearch: true })
      : this.setState({ isSearch: false });

    let searchArr = [];

    for (let i = 0; i < this.state.allPokemons.length; i++) {
      if (
        this.state.allPokemons[i].name.includes(e.target.value.toLowerCase()) ||
        this.state.allPokemons[i].id.toString().includes(e.target.value)
      ) {
        searchArr.push(this.state.allPokemons[i]);
      }
    }

    searchArr.length === 0
      ? this.setState({ searchPokemons: [] })
      : this.setState({ searchPokemons: searchArr });
  };

  render() {
    return (
      <div className="App m-2">
        <GitHub />
        <Header onSearchChange={this.onSearchChange} />
        <div className="poke-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 mt-2 bg-slate-600">
          {this.state.isSearch
            ? Object.keys(this.state.searchPokemons).map((item) => (
                <PokeCard
                  key={this.state.searchPokemons[item].id}
                  index={this.state.searchPokemons[item].id}
                  name={this.state.searchPokemons[item].name}
                  imgUrl={
                    this.state.searchPokemons[item].sprites.other.dream_world
                      .front_default
                  }
                />
              ))
            : Object.keys(this.state.allPokemons).map((item) => (
                <PokeCard
                  key={this.state.allPokemons[item].id}
                  index={this.state.allPokemons[item].id}
                  name={this.state.allPokemons[item].name}
                  imgUrl={
                    this.state.allPokemons[item].sprites.other.dream_world
                      .front_default
                  }
                />
              ))}
        </div>
      </div>
    );
  }
}

export default App;
