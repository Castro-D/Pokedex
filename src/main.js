const $frames = document.querySelectorAll('.frame');
let POKEMONSPERPAGE = 20;
let CURRENTPAGE = 1;
let modal = document.querySelector('#my-modal');
let modalHeader = document.querySelector('.modal-header');
let modalBody = document.querySelector('.modal-body');
let pokemonNode = document.querySelector('#pokemon-image');
let TOTALPOKEMONS = 1118;
let paginationElement = document.querySelector('#pagination');

closeModal()
displayPokemons(CURRENTPAGE)
setUpPagination(TOTALPOKEMONS, POKEMONSPERPAGE, paginationElement)
showPokemonsInfo();

function getListOfApiUrl() {
    let listOfApiUrl = []; 
    const apiOffset = 20;
    const apiOffsetEnd = 1100;
    for (let i=0; i <= apiOffsetEnd; i += apiOffset) {
        listOfApiUrl.push(`https://pokeapi.co/api/v2/pokemon?offset=${i}&limit=20`)
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
    $frames.forEach(function($frame){
        $frame.addEventListener('click', (e) => {
            showModal(); 
            const pokemon = e.target.innerHTML;
            modalHeader.textContent = pokemon;
            pokemonsResponse = getPokemonData(pokemon)
                .then(data => {
                    pokemonNode.src = '';
                    const pokemonImageSource = data.sprites['front_default'];
                    const pokemonHeight = document.querySelector('#pokemon-height');
                    const pokemonType = document.querySelector('#pokemon-type');
                    const pokemonWeight = document.querySelector('#pokemon-weight');
                    let abilitiesText = document.querySelector('#abilities-text');
    
                    pokemonNode.src = pokemonImageSource;
    
                    pokemonHeight.innerHTML = `Height: ${data.height}`;
                    pokemonType.innerHTML = `Type: ${data.types['0']['type'].name}`;
                    pokemonWeight.innerHTML = `Weight: ${data.weight}`;
    
                    abilitiesText.textContent = ``;
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