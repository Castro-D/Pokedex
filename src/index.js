import {
  displayPokemons,
  closeModal,
  obtainSelectedPokemon,
  setUpPagination,
  showPokemonsInfo,
  obtainSelectedPage,
} from './ui.js';

import { getPokemonData, getListOfApiUrl, obtainPokemons } from './api.js';

async function updatePokemons() {
  const urlPokemons = getListOfApiUrl();
  const pokemons = await obtainPokemons(urlPokemons, obtainSelectedPage());
  displayPokemons(pokemons);
}

async function handlePokemonClicked(pokemon) {
  const data = await getPokemonData(pokemon);
  showPokemonsInfo(data, pokemon);
}

function initialize() {
  updatePokemons();
  closeModal();
  setUpPagination(updatePokemons);
  obtainSelectedPokemon(handlePokemonClicked);
}

initialize();
