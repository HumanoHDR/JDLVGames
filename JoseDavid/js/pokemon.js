// Función para obtener un Pokémon al azar desde la PokeAPI
var pokemoninicial = []

obtenerPokemonRandom();
function obtenerPokemonRandom() {
  // Limpiar el contenido previo
  // Obtener un número aleatorio para el Pokémon
  var pokemonId = Math.floor(Math.random() * 898 + 1);

  // URL de la PokeAPI para obtener detalles del Pokémon
  var url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonId;

  // URL de la PokeAPI para obtener detalles de la especie del Pokémon
  var urlEspecie = 'https://pokeapi.co/api/v2/pokemon-species/' + pokemonId;


  // Mapear nombres de tipos a español
  var tiposEnEspanol = {
    normal: "Normal",
    fighting: "Lucha",
    flying: "Volador",
    poison: "Veneno",
    ground: "Tierra",
    rock: "Roca",
    bug: "Bicho",
    ghost: "Fantasma",
    steel: "Acero",
    fire: "Fuego",
    water: "Agua",
    grass: "Planta",
    electric: "Eléctrico",
    psychic: "Psíquico",
    ice: "Hielo",
    dragon: "Dragón",
    dark: "Siniestro",
    fairy: "Hada"
    // Puedes agregar más tipos según sea necesario
  };

  // Realizar la solicitud utilizando fetch para detalles del Pokémon
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Realizar la solicitud utilizando fetch para detalles de la especie
      fetch(urlEspecie)
        .then(responseEspecie => responseEspecie.json())
        .then(dataEspecie => {
          // Aqui sacaremos todos los campos del pokemon aleatorio
          pokemoninicial[0] = data.id;

          // Tipos del Pokémon en español
          tipos = data.types.map(type => tiposEnEspanol[type.type.name]).join(", ");
          tipos = tipos.split(",");

          pokemoninicial[1] = tipos[0]

          if (tipos[1] == null) pokemoninicial[2] = tipos[0];
          else pokemoninicial[2] = tipos[1];


          // Generación del Pokémon
          pokemoninicial[3] = obtenerGeneracion(dataEspecie.generation.name);

          // Nombre del Pokémon
          pokemoninicial[4] = data.name;
          pokemoninicial[5] = data.weight;
          pokemoninicial[6] = data.height / 10;

          console.log(pokemoninicial); //

        })
        .catch(errorEspecie => console.error('Error al obtener detalles de la especie del Pokémon', errorEspecie));
    })
    .catch(error => console.error('Error al obtener detalles del Pokémon', error));
}
var tiposEnEspanol = {
  normal: "Normal",
  fighting: "Lucha",
  flying: "Volador",
  poison: "Veneno",
  ground: "Tierra",
  rock: "Roca",
  bug: "Bicho",
  ghost: "Fantasma",
  steel: "Acero",
  fire: "Fuego",
  water: "Agua",
  grass: "Planta",
  electric: "Eléctrico",
  psychic: "Psíquico",
  ice: "Hielo",
  dragon: "Dragón",
  dark: "Siniestro",
  fairy: "Hada"
  // Puedes agregar más tipos según sea necesario
};
divtitulos = document.getElementById("titulos");
// Función para obtener la generación a partir del nombre de la generación
function obtenerGeneracion(nombreGeneracion) {
  // Mapear nombres de generaciones a números
  var generaciones = {
    "generation-i": 1,
    "generation-ii": 2,
    "generation-iii": 3,
    "generation-iv": 4,
    "generation-v": 5,
    "generation-vi": 6,
    "generation-vii": 7,
    "generation-viii": 8,
  };

  // Obtener el número de la generación a partir del nombre
  return generaciones[nombreGeneracion] || "Desconocida";
}

// Función para obtener el número de evolución y cuántas evoluciones tiene
function obtenerEvoluciones(evolvesFromSpecies) {
  if (!evolvesFromSpecies) {
    // Si no hay información de evolución, el Pokémon es la primera forma
    return { numeroEvolucion: 1, cantidadEvoluciones: 0 };
  }

  // Contar el número de evolución y cuántas evoluciones tiene
  var numeroEvolucion = 1;
  var cantidadEvoluciones = evolvesFromSpecies.evolves_to.length;

  return { numeroEvolucion, cantidadEvoluciones };
}

comprobar = document.getElementById("Comprobar");

comprobar.addEventListener("click", function () {
  nombrePokemonUsuario = document.getElementById("nombrePokemon").value;
  nombrePokemonUsuario = nombrePokemonUsuario.toLowerCase();
  console.log(nombrePokemonUsuario);
  if (nombrePokemonUsuario != "") {
    errores = document.getElementById("error");
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemonUsuario}/`)
      .then(response => response.json())
      .then(pokemon => {
        pokemonid = pokemon.id
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonid}/`)
          .then(response => response.json())
          .then(dataEspecie => {
            divcreation = document.createElement("div")
            divcreation.classList.add("resultado");

            generacionPokemon = document.createElement("div");
            generacionPokemon.classList.add("r3")
            let gen = obtenerGeneracion(dataEspecie.generation.name);
            generacionPokemon.innerText = gen;
            divcreation.appendChild(generacionPokemon);

            /*nombrePoke = document.createElement("div");
            nombrePoke.classList.add("r4");
            nombrePoke.innerHTML = pokemon.name;
            divcreation.appendChild(nombrePoke);*/

            tipos = pokemon.types.map(type => tiposEnEspanol[type.type.name]).join(", ");
            tipos = tipos.split(",");

            tipo1Pokemon = document.createElement("div");
            tipo1Pokemon.classList.add("r1");


            tipo1Pokemon.innerText = tipos[0];
            divcreation.appendChild(tipo1Pokemon);

            tipo2Pokemon = document.createElement("div");
            tipo2Pokemon.classList.add("r2");
            if (tipos[1] == null) tipos[1] = tipos[0];
            tipo2Pokemon.innerText = tipos[1];

            pesopokemon = document.createElement("div");
            pesopokemon.classList.add("r5");
            let peso = pokemon.weight;
            pesopokemon.innerText = peso+ "kg";
            divcreation.appendChild(pesopokemon);

            alturapokemon = document.createElement("div");
            alturapokemon.classList.add("r4");
            altura = pokemon.height / 10
            alturapokemon.innerText = altura + " m";
            divcreation.appendChild(alturapokemon);

            divcreation.appendChild(tipo2Pokemon);
            console.log(pokemoninicial)
            if (tipos[0] === pokemoninicial[1]) {
              tipo1Pokemon.classList.add("acierto");
            } else {
              tipo1Pokemon.classList.add("fallo");
            }
            if (tipos[1] === pokemoninicial[2]) {
              tipo2Pokemon.classList.add("acierto");
            } else {
              tipo2Pokemon.classList.add("fallo");
            }
            if (gen === pokemoninicial[3]) {
              generacionPokemon.classList.add("acierto");
            } else {
              generacionPokemon.classList.add("fallo");
            }
            if (peso > pokemoninicial[5]) {
              pesopokemon.innerText = "↓ "+peso+ "kg";
              divcreation.appendChild(pesopokemon);
            } 
            else if (peso < pokemoninicial[5]) {
              pesopokemon.innerText = "↑ "+peso+ "kg";
              divcreation.appendChild(pesopokemon);
            }
            else if (peso == pokemoninicial[5]) {
              pesopokemon.innerText = peso+ "kg";
              pesopokemon.classList.add("acierto");
              divcreation.appendChild(pesopokemon);
            }
            if (altura == pokemoninicial[6]) {
              alturapokemon.classList.add("acierto");
              alturapokemon.innerText = altura + " m";
              divcreation.appendChild(alturapokemon);
            } else if(altura > pokemoninicial[6]){
              alturapokemon.innerText = "↓ "+altura + " m";
              divcreation.appendChild(alturapokemon);
            } else if(altura < pokemoninicial[6]){
              alturapokemon.innerText = "↑ "+altura + " m";
              divcreation.appendChild(alturapokemon);
            }


            divtitulos.insertAdjacentElement('afterend', divcreation);
            console.log("exito")
          })
      })
  }
});

function mostrarPokemon(pokemon) {

};