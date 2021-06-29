import {
  displayPokemons,
  closeModal,
  obtainSelectedPokemon,
  setUpPagination,
  showPokemonsInfo,
  obtainSelectedPage,
} from './ui.js';

import Pokemon from './classes.js';

import { getPokemonData, getListOfApiUrl, obtainPokemons } from './api.js';

async function updatePokemons() {
  const urlPokemons = getListOfApiUrl();
  const pokemons = await obtainPokemons(urlPokemons, obtainSelectedPage());
  displayPokemons(pokemons);
}

async function handlePokemonClicked(pokemon) {
  const data = await getPokemonData(pokemon);
  const pokemonObject = new Pokemon(data.sprites.front_default, data.height, data.types['0'].type.name, data.weight, data.abilities);
  showPokemonsInfo(pokemonObject, pokemon);
}

function initialize() {
  updatePokemons();
  closeModal();
  setUpPagination(updatePokemons);
  obtainSelectedPokemon(handlePokemonClicked);
}

initialize();
