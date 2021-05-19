const $frames = document.querySelectorAll('.frame');
const POKEMONSPERPAGE = 20;

function resetTextNodes() {
  $frames.forEach(($frame) => {
    $frame.textContent = '';
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

export default function displayPokemons(page, apiResponse) {
  resetTextNodes();
  page -= 1;
  for (let i = 0; i < POKEMONSPERPAGE; i += 1) {
    const content = document.createTextNode(`${apiResponse[i]}`);
    $frames[i].appendChild(content);
  }
}

export function setUpPagination(pokemons, pokemonsperpage, wrapper) {
  const pageCount = Math.ceil(pokemons / pokemonsperpage);
  for (let i = 1; i < pageCount + 1; i += 1) {
    const btn = paginationButton(i);
    wrapper.appendChild(btn);
  }
}
