import {
  displayPokemons,
  closeModal,
  obtainSelectedPokemon,
  // setUpPagination,
  // showPokemonsInfo,
} from './ui.js';

import { getPokemonData, obtainPokemons } from './api.js';

function initialize() {
  displayPokemons(obtainPokemons());
  // closeModal();
  // setUpPagination();
  // const data = await getPokemonData(obtainSelectedPokemon)
  // showPokemonsInfo(data);
}

initialize();
