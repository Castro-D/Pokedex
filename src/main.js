const $frames = document.querySelectorAll('.frame');
const POKEMONSPERPAGE = 20;
let CURRENTPAGE = 1;
const modal = document.querySelector('#my-modal');
const TOTALPOKEMONS = 1118;
const paginationElement = document.querySelector('#pagination');

function getListOfApiUrl() {
  const listOfApiUrl = [];
  const apiOffset = 20;
  const apiOffsetEnd = 1100;
  for (let i = 0; i <= apiOffsetEnd; i += apiOffset) {
    listOfApiUrl.push(`https://pokeapi.co/api/v2/pokemon?offset=${i}&limit=20`);
  }
  return listOfApiUrl;
}

function resetTextNodes() {
  $frames.forEach(($frame) => {
    $frame.textContent = '';
  });
}

function fetchApiUrls(url, page) {
  return fetch(`${url[page]}`).then((response) => response.json());
}

function displayPokemons(page) {
  const listOfApiUrl = getListOfApiUrl();
  resetTextNodes();
  page -= 1;

  const apiResponse = fetchApiUrls(listOfApiUrl, page);
  apiResponse.then((data) => {
    for (let i = 0; i < POKEMONSPERPAGE; i += 1) {
      const content = document.createTextNode(`${data.results[i].name}`);
      $frames[i].appendChild(content);
    }
  });
}

function paginationButton(page) {
  const button = document.createElement('button');
  button.innerText = page;
  if (CURRENTPAGE === page) button.classList.add('active');
  button.addEventListener('click', () => {
    CURRENTPAGE = page;
    displayPokemons(CURRENTPAGE);
    const currentBtn = document.querySelector('.pagenumbers button.active');
    currentBtn.classList.remove('active');
    button.classList.add('active');
  });

  return button;
}

function setUpPagination(pokemons, pokemonsperpage, wrapper) {
  const pageCount = Math.ceil(pokemons / pokemonsperpage);
  for (let i = 1; i < pageCount + 1; i += 1) {
    const btn = paginationButton(i);
    wrapper.appendChild(btn);
  }
}

function closeModal() {
  const span = document.querySelector('.close');

  span.onclick = () => {
    modal.style.display = 'none';
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}

function showModal() {
  modal.style.display = 'block';
}

function resetPokemonInfo(pokemonImage, abilitiesText, pokemonHeight, pokemonType, pokemonWeight) {
  pokemonImage.src = '';
  abilitiesText.textContent = '';
  pokemonHeight.textContent = '';
  pokemonType.textContent = '';
  pokemonWeight.textContent = '';
}

function displayPokemonHeader(modalHeader, pokemon) {
  modalHeader.textContent = pokemon;
}

function getPokemonData(pokemon) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response) => response.json());
}

function showPokemonsInfo() {
  const modalHeader = document.querySelector('.modal-header');
  const pokemonImage = document.querySelector('#pokemon-image');
  const pokemonHeight = document.querySelector('#pokemon-height');
  const pokemonType = document.querySelector('#pokemon-type');
  const pokemonWeight = document.querySelector('#pokemon-weight');
  const abilitiesText = document.querySelector('#abilities-text');

  $frames.forEach(($frame) => {
    $frame.addEventListener('click', (e) => {
      const pokemon = e.target.innerHTML;

      showModal();
      resetPokemonInfo(pokemonImage, abilitiesText, pokemonHeight, pokemonType, pokemonWeight);
      displayPokemonHeader(modalHeader, pokemon);

      getPokemonData(pokemon)
        .then((data) => {
          pokemonImage.src = data.sprites.front_default;
          pokemonHeight.innerHTML = `Height: ${data.height}`;
          pokemonType.innerHTML = `Type: ${data.types['0'].type.name}`;
          pokemonWeight.innerHTML = `Weight: ${data.weight}`;

          data.abilities.forEach((ability) => {
            abilitiesText.textContent += `${ability.ability.name}, `;
          });
        });
    });
  });
}

closeModal();
displayPokemons(CURRENTPAGE);
setUpPagination(TOTALPOKEMONS, POKEMONSPERPAGE, paginationElement);
showPokemonsInfo();
