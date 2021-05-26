const $frames = document.querySelectorAll('.frame');
const POKEMONSPERPAGE = 20;
const modal = document.querySelector('#my-modal');

function resetTextNodes() {
  $frames.forEach(($frame) => {
    $frame.textContent = '';
  });
}
export function displayPokemons(listOfPokemons) {
  resetTextNodes();
  for (let i = 0; i < POKEMONSPERPAGE; i += 1) {
    const content = document.createTextNode(listOfPokemons[i]);
    $frames[i].appendChild(content);
  }
}

export function obtainSelectedPage() {
  const $activePage = document.querySelector('.pagenumbers button.active');
  if ($activePage) {
    const pageNumber = Number($activePage.innerText);
    const properIndex = pageNumber - 1;
    return properIndex;
  }
  const firstPage = 0;
  return firstPage;
}

function paginationButton(page, callbackUpdate) {
  const FIRSTPAGE = 1;
  const button = document.createElement('button');
  button.innerText = page;
  if (FIRSTPAGE === page) button.classList.add('active');
  button.addEventListener('click', () => {
    const currentBtn = document.querySelector('.pagenumbers button.active');
    currentBtn.classList.remove('active');
    button.classList.add('active');
    callbackUpdate();
  });

  return button;
}

export function obtainSelectedPokemon(callbackPokemon) {
  const $pokemonContainer = document.querySelector('.container');
  $pokemonContainer.onclick = (e) => {
    const $element = e.target;
    if ($element.classList.contains('frame')) {
      callbackPokemon($element.innerText);
    }
  };
}

export function setUpPagination(callbackUpdate) {
  const wrapper = document.querySelector('#pagination');
  const pokemons = 1118;
  const pageCount = Math.ceil(pokemons / POKEMONSPERPAGE);
  for (let i = 1; i < pageCount + 1; i += 1) {
    const btn = paginationButton(i, callbackUpdate);
    wrapper.appendChild(btn);
  }
}

export function closeModal() {
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

export function showPokemonsInfo(data, pokemon) {
  const modalHeader = document.querySelector('.modal-header');
  const pokemonImage = document.querySelector('#pokemon-image');
  const pokemonHeight = document.querySelector('#pokemon-height');
  const pokemonType = document.querySelector('#pokemon-type');
  const pokemonWeight = document.querySelector('#pokemon-weight');
  const abilitiesText = document.querySelector('#abilities-text');

  showModal();
  resetPokemonInfo(pokemonImage, abilitiesText, pokemonHeight, pokemonType, pokemonWeight);
  displayPokemonHeader(modalHeader, pokemon);
  pokemonImage.src = data.sprites.front_default;
  pokemonHeight.innerHTML = `Height: ${data.height}`;
  pokemonType.innerHTML = `Type: ${data.types['0'].type.name}`;
  pokemonWeight.innerHTML = `Weight: ${data.weight}`;
  data.abilities.forEach((ability) => {
    abilitiesText.textContent += `${ability.ability.name}, `;
  });
}
