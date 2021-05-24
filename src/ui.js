const $frames = document.querySelectorAll('.frame');
const POKEMONSPERPAGE = 20;
const modal = document.querySelector('#my-modal');
let CURRENTPAGE = 1;

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

export function obtainSelectedPokemon() {
  $frames.forEach(($frame) => {
    $frame.addEventListener('click', (e) => e.target.innerHTML);
  });
}

export function setUpPagination() {
  const wrapper = document.querySelector('#pagination');
  const pokemons = 1118;
  const pageCount = Math.ceil(pokemons / POKEMONSPERPAGE);
  for (let i = 1; i < pageCount + 1; i += 1) {
    const btn = paginationButton(i);
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

export function showPokemonsInfo(data) {
  const modalHeader = document.querySelector('.modal-header');
  const pokemonImage = document.querySelector('#pokemon-image');
  const pokemonHeight = document.querySelector('#pokemon-height');
  const pokemonType = document.querySelector('#pokemon-type');
  const pokemonWeight = document.querySelector('#pokemon-weight');
  const abilitiesText = document.querySelector('#abilities-text');

  $frames.forEach(($frame) => {
    $frame.addEventListener('click', () => {
      showModal();
      resetPokemonInfo(pokemonImage, abilitiesText, pokemonHeight, pokemonType, pokemonWeight);
      displayPokemonHeader(modalHeader, pokemon);
      pokemonImage.src = data.sprites.data.sprites.front_default;
      pokemonHeight.innerHTML = `Height: ${data.height}`;
      pokemonType.innerHTML = `Type: ${data.types['0'].type.name}`;
      pokemonWeight.innerHTML = `Weight: ${data.weight}`;
      data.abilities.forEach((ability) => {
        abilitiesText.textContent += `${ability.ability.name}, `;
      });
    });
  });
}
