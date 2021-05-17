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

function displayPokemons(page) {
    let listOfApiUrl = getListOfApiUrl();
    resetTextNodes()
    page--;

    const apiResponse = fetchApiUrls(listOfApiUrl, page);
        apiResponse.then((data) => {
            for (let i=0; i<POKEMONSPERPAGE; i++) {
                let content = document.createTextNode(`${data['results'][i].name}`);
                $frames[i].appendChild(content);
            };
        })
}

function fetchApiUrls (url, page) {
    return fetch(`${url[page]}`).then(response => response.json());
}

function setUpPagination(pokemons, pokemonsperpage, wrapper){
    let pageCount = Math.ceil(pokemons / pokemonsperpage)
    for (let i = 1; i < pageCount + 1; i++) {
		let btn = paginationButton(i);
		wrapper.appendChild(btn);
	}
}

function paginationButton(page){
    let button = document.createElement('button');
    button.innerText = page;
    if (CURRENTPAGE == page) button.classList.add('active');
    button.addEventListener('click', function(){
        CURRENTPAGE = page;
        displayPokemons(CURRENTPAGE);
        let current_btn = document.querySelector('.pagenumbers button.active');
        current_btn.classList.remove('active');
        button.classList.add('active');     
    })
    
    return button
}

function resetTextNodes(){
    $frames.forEach(function ($frame){
        $frame.textContent = '';
        return;
    })
}

function closeModal () {
    let span = document.querySelector('.close');

    span.onclick = function() {
        modal.style.display = "none";
    };
    
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        };
    };
}

function showPokemonsInfo() {
    let modalHeader = document.querySelector('.modal-header');
    let pokemonImage = document.querySelector('#pokemon-image');
    const pokemonHeight = document.querySelector('#pokemon-height');
    const pokemonType = document.querySelector('#pokemon-type');
    const pokemonWeight = document.querySelector('#pokemon-weight');
    let abilitiesText = document.querySelector('#abilities-text');

    $frames.forEach(function($frame){
        $frame.addEventListener('click', (e) => { 
            const pokemon = e.target.innerHTML;

            showModal(); 
            resetPokemonInfo(pokemonImage, abilitiesText, pokemonHeight, pokemonType, pokemonWeight);  
            displayPokemonHeader(modalHeader, pokemon);

            pokemonsResponse = getPokemonData(pokemon)
                .then(data => {
                    pokemonImage.src = data.sprites['front_default'];
                    pokemonHeight.innerHTML = `Height: ${data.height}`;
                    pokemonType.innerHTML = `Type: ${data.types['0']['type'].name}`;
                    pokemonWeight.innerHTML = `Weight: ${data.weight}`;
    
                    data['abilities'].forEach(function (ability){
                        abilitiesText.textContent += `${ability['ability'].name}, `;
                    });      
                });           
        });
    });
}

function showModal () {
    modal.style.display = "block";
}

function getPokemonData (pokemon) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => response.json())
}

function resetPokemonInfo (pokemonImage, abilitiesText, pokemonHeight, pokemonType, pokemonWeight) {
    pokemonImage.src = '';
    abilitiesText.textContent = ``;
    pokemonHeight.textContent = '';
    pokemonType.textContent = '';
    pokemonWeight.textContent = '';
}

function displayPokemonHeader (modalHeader, pokemon) {
    modalHeader.textContent = pokemon;
}

closeModal();
displayPokemons(CURRENTPAGE);
setUpPagination(TOTALPOKEMONS, POKEMONSPERPAGE, paginationElement);
showPokemonsInfo();
