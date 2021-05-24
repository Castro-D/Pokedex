import {
  displayPokemons,
  closeModal,
  obtainSelectedPokemon,
  setUpPagination,
  showPokemonsInfo,
} from './ui.js';

import { getPokemonData, obtainPokemons } from './api.js';

function getListOfApiUrl() {
  const listOfApiUrl = [];
  const apiOffset = 20;
  const apiOffsetEnd = 1100;
  for (let i = 0; i <= apiOffsetEnd; i += apiOffset) {
    listOfApiUrl.push(`https://pokeapi.co/api/v2/pokemon?offset=${i}&limit=20`);
  }
  return listOfApiUrl;
}

async function initialize() {
  displayPokemons(await obtainPokemons());
  closeModal();
  setUpPagination();
  const data = await getPokemonData(obtainSelectedPokemon());
  showPokemonsInfo(data);
}

initialize();
