const $frames = document.querySelectorAll('.frame');
const POKEMONSPERPAGE = 20;
let modal = document.querySelector('#my-modal');
let span = document.querySelector('.close');
let modalHeader = document.querySelector('.modal-header');

fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(response => response.json())
    .then(data => {
        for (let i=0; i<20; i++) {
            let content = document.createTextNode(`${data['results'][i].name}`);
            $frames[i].appendChild(content);
        };
    });

$frames.forEach(function($frame){
    $frame.onclick = function(e){
        modal.style.display = "block";
        modalHeader.textContent = e.target.innerHTML;
    };
});

span.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    };
  };
