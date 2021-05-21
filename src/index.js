/* eslint-disable import/extensions */
import {
  displayPokemons,
  closeModal,
  obtainSelectedPokemon,
  // setUpPagination,
  // showPokemonsInfo,
} from './ui.js';

import { getPokemonData, obtainPokemons } from './api.js';

let CURRENTPAGE = 1;

function async initialize() {
  displayPokemons(CURRENTPAGE, obtainPokemons());
  closeModal();
  // setUpPagination();
  const data = await getPokemonData(obtainSelectedPokemon)
  // showPokemonsInfo(data);
}

initialize();
