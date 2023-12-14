document.addEventListener("DOMContentLoaded", function() {
    fetch('https://pokeapi.co/api/v2/pokemon-species/')
        .then(response => response.json())
        .then(data => {
            const totalPokemon = data.count;
            const randomId = Math.floor(Math.random() * totalPokemon) + 1;
            fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}/`)
                .then(response => response.json())
                .then(pokemonData => mostrarPokemon(pokemonData));
        });
});
function randomids(totalPokemon) {
    var randomId = Math.floor(Math.random() * totalPokemon) + 1;
    return randomId;
}
function mostrarPokemon(pokemon) {
    sprite = pokemon.sprites.front_default
    spritepokeon = document.createElement('img');
    spritepokeon.src = sprite;
    spritepokeon.alt = pokemon.name;
    const container = document.getElementById('pokemon-container');
    container.innerHTML = `<h1>${pokemon.name}</h1>`;
    container.appendChild(spritepokeon);
};
