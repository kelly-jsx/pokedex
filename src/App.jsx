import React from "react";
import axios from "axios";

import GitHub from "./components/GitHub";
import Header from "./components/Header/Header";
import PokeCard from "./components/PokeCard";
import PokeInfo from "./components/PokeInfo";

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
      // Poke Info
      index: "",
      name: "",
      imgUrl: "",
      types: [],
      height: "",
      weight: "",
      genderRate: "",
    };
  }

  componentDidMount() {
    this.getAllPokemons(this.state.offset, this.state.limit);
    this.getPokemonInfo();
    this.getPokemonSpecies();
    // bulbasaur for test
  }

  getPokemonInfo = async () => {
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon/bulbasaur`)
      .then((result) => {
        const data = result.data;
        this.setState({
          index: data.id,
          name: data.name,
          imgUrl: data.sprites.other.dream_world.front_default,
          types: data.types,
          height: data.height,
          weight: data.weight,
        });
      });
  };

  getPokemonSpecies = async () => {
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/bulbasaur`)
      .then((result) => {
        const data = result.data;
        this.setState({
          genderRate: data.gender_rate,
        });
      });
  };

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
        this.state.allPokemons[i].id.toString().includes(e.target.value) ||
        this.state.allPokemons[i].id
          .toString()
          .padStart(3, "0")
          .includes(e.target.value)
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
      <div className="h-full dark bg-slate-800">
        <div>
          <GitHub />
          <Header onSearchChange={this.onSearchChange} />
          {/*<PokeInfo*/}
          {/*  key={this.state.index}*/}
          {/*  index={this.state.index}*/}
          {/*  name={this.state.name}*/}
          {/*  imgUrl={this.state.imgUrl}*/}
          {/*  type={this.state.types}*/}
          {/*  height={this.state.height}*/}
          {/*  weight={this.state.weight}*/}
          {/*  genderRate={this.state.genderRate}*/}
          {/*/>*/}
          <div className="mt-5 grid mx-4 pb-4 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
            {this.state.isSearch
              ? Object.keys(this.state.searchPokemons).map((item) => (
                  <PokeCard
                    key={this.state.searchPokemons[item].id}
                    id={this.state.searchPokemons[item].id}
                    name={this.state.searchPokemons[item].name}
                    image={
                      this.state.searchPokemons[item].sprites.other.dream_world
                        .front_default
                    }
                    type={this.state.searchPokemons[item].types}
                  />
                ))
              : Object.keys(this.state.allPokemons).map((item) => (
                  <PokeCard
                    key={this.state.allPokemons[item].id}
                    id={this.state.allPokemons[item].id}
                    name={this.state.allPokemons[item].name}
                    image={
                      this.state.allPokemons[item].sprites.other.dream_world
                        .front_default
                    }
                    type={this.state.allPokemons[item].types}
                  />
                ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
