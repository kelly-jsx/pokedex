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
      category: "",
      imgUrl: "",
      types: [],
      height: "",
      weight: "",
      genderRate: "",
      description: "",
      abilities: [],
      stats: [],
      evolutions: [],
      infoOpened: false,
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
          abilities: data.abilities,
          stats: data.stats,
        });
      });
  };

  getPokemonSpecies = async () => {
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/bulbasaur`)
      .then((result) => {
        const data = result.data;
        let genera;
        let description;

        // this.getEvoInfo(data.evolution_chain.url);

        for (let i = 0; i < data.genera.length; i++) {
          if (data.genera[i].language.name === "en") {
            genera = data.genera[i].genus;
            break;
          }
        }

        for (let i = 0; i < data.flavor_text_entries.length; i++) {
          if (data.flavor_text_entries[i].language.name === "en") {
            description = data.flavor_text_entries[i].flavor_text;
            break;
          }
        }

        this.setState({
          genderRate: data.gender_rate,
          category: genera,
          description: description,
        });
      });
  };

  // getEvoInfo = async (url) => {
  //   const result = await axios.get(url).catch((err) => console.log(err));
  //   const evoArr = [];
  //   let data = result.data.chain;
  //
  //   do {
  //     const evoDetails = data["evolution_details"][0];
  //
  //     evoArr.push({
  //       species_name: data.species.name,
  //       min_level: !evoDetails ? 1 : evoDetails.min_level,
  //       trigger_name: !evoDetails ? null : evoDetails.trigger.name,
  //       item: !evoDetails ? null : evoDetails.item,
  //     });
  //   } while (!!data && data.hasOwnProperty("evolves_to"));
  //
  //   this.getEvoImg(evoArr);
  // };
  //
  // getEvoImg = async (evoArr) => {
  //   for (let i = 0; i < evoArr.length; i++) {
  //     const result = await axios
  //       .get(`https://pokeapi.co/api/v2/pokemon/${evoArr[i].species_name}`)
  //       .catch((err) => console.log("Error:", err));
  //     result.data.sprites.other.dream_world.front_default
  //       ? (evoArr[i]["image_url"] =
  //           result.data.sprites.other.dream_world.front_default)
  //       : (evoArr[i]["image_url"] =
  //           result.data.sprites.other["official-artwork"].front_default);
  //   }
  //
  //   this.setState({
  //     evolutions: evoArr,
  //   });
  // };

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

  onClickCloseInfo = (event) => {
    this.setState({ infoOpened: event });
  };

  render() {
    return (
      <div className="h-full dark bg-slate-800 text-white pt-4">
        <div className={this.state.infoOpened ? "blur" : ""}>
          <GitHub />
          <Header onSearchChange={this.onSearchChange} />
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
                    onClickHandle={() => this.onClickCloseInfo(true)}
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
                    onClickHandle={() => this.onClickCloseInfo(true)}
                  />
                ))}
          </div>
        </div>
        <PokeInfo
          key={this.state.index}
          index={this.state.index}
          name={this.state.name}
          imgUrl={this.state.imgUrl}
          type={this.state.types}
          height={this.state.height}
          weight={this.state.weight}
          genderRate={this.state.genderRate}
          category={this.state.category}
          description={this.state.description}
          abilities={this.state.abilities}
          stats={this.state.stats}
          isOpened={this.state.infoOpened}
          onClickHandle={() => this.onClickCloseInfo(false)}
        />
      </div>
    );
  }
}

export default App;
