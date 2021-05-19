import {
  displayPokemons,
  closeModal,
  setUpPagination,
  showPokemonsInfo,
} from './ui';

import { obtainPokemons } from './api';

let CURRENTPAGE = 1;

function async initialize() {
  displayPokemons(CURRENTPAGE, obtainPokemons);
  closeModal();
  setUpPagination(); 
  showPokemonsInfo();
}

initialize();
