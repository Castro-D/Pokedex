const $frames = document.querySelectorAll('.frame');
const POKEMONSPERPAGE = 20;

fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(response => response.json())
    .then(data => {
        for (let i=0; i<20; i++) {
            let content = document.createTextNode(`${data['results'][i].name}`);
            $frames[i].appendChild(content);
        };
    });

$frames.forEach(function($frame){
    $frame.onclick = function(){
        console.log('Info de pokemon relevante');
    };
});
