export function getListOfApiUrl() {
  const listOfApiUrl = [];
  const apiOffset = 20;
  const apiOffsetEnd = 1100;
  for (let i = 0; i <= apiOffsetEnd; i += apiOffset) {
    listOfApiUrl.push(`https://pokeapi.co/api/v2/pokemon?offset=${i}&limit=20`);
  }
  return listOfApiUrl;
}

export function fetchApiUrls(url, page) {
  return fetch(url[page]).then((response) => response.json());
}

export async function obtainPokemons(url, page) {
  const pokemons = [];
  const data = await fetchApiUrls(url, page);
  for (let i = 0; i < 20; i += 1) {
    pokemons.push(data.results[i].name);
  }
  return pokemons;
}

export function getPokemonData(pokemon) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then((response) => response.json());
}
