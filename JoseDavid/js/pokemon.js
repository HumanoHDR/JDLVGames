// Función para obtener un Pokémon al azar desde la PokeAPI
var pokemoninicial = []
var generaciones = 1025;
var formulario = document.getElementById("form");
var sitioform = document.getElementById("poneraqui");
var nuevapartida = document.createElement("button");
nuevapartida.classList.add("Comprobar");
nuevapartida.innerHTML = "Nueva Partida";
nuevapartida.setAttribute("id", "reinicio");
nuevapartida.setAttribute("onclick","selectgen()");
// Obtener referencias a los elementos del DOM:
var inputNombrePokemon = document.getElementById("nombrePokemon");
var datalistPokemon = document.getElementById("pokemonList");
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
//La función selectgen sirve para que cuando de alguna forma se tenga que eleguir un pokemon nuevo
//este sea entre las generaciones que se hayan seleccionado o bien se encarga de empezar una partida cuando se empieza de nuevo
function selectgen() {
  if(document.getElementById("generaciones"))
  {
    //Lo primero como cuando se gana se borra el selector de generaciones es saber cuantos pokemons pondremos
    generaciones = document.getElementById("generaciones").value;
  } else generaciones=1025;
  //En marcando el numero de pokemons que queremos se llamara a la funcion obtener pokemon random que es la 
  //que se encarga de sacar el pokemon que hay que adivinar
  obtenerPokemonRandom();
  //Despues de crear el pokemon miraremos si estamos en esta funcion por que se termino la partida o si es en caso
  //de solo cambiar la generacion
  if ( document.getElementById("reinicio"))
  {
    //si llega aqui significa que terminamos la partida y una vez pulsado el botton agregaremos el buscador y borraremos el reiniciar partida
    sitioform.removeChild(nuevapartida)
    sitioform.insertAdjacentElement('afterend', formulario)
  }
  //declaramos el contenedor donde se encuentran todos los resultados que hemos obtenido en la partida para asi borrarlos
  divremover = document.getElementsByClassName("resultado")
  while (divremover.length > 0) {
    //atraves de este bucle borraremos todos los resultados
    divremover[0].parentNode.removeChild(divremover[0]);
  }
  divremover = document.getElementsByClassName("resultado2")
  while (divremover.length > 0) {
    //atraves de este bucle borraremos todos los resultados
    divremover[0].parentNode.removeChild(divremover[0]);
  }
}

// Función para obtener nombres de Pokémon desde la API:
function fetchPokemonNames() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=1025")
    .then(response => response.json())
    .then(data => {
      // Extraer nombres de Pokémon de los resultados de la API
      var pokemonNames = data.results.map(pokemon => pokemon.name);

      // Llenar el datalist con los nombres de Pokémon
      pokemonNames.forEach(function (pokemonName) {
        var option = document.createElement("option");
        option.value = pokemonName;
        datalistPokemon.appendChild(option);
      });
    })
    .catch(error => console.error('Error al obtener nombres de Pokémon', error));
}

// Llamar a la función para obtener nombres de Pokémon:
fetchPokemonNames();

// Agregar un event listener para cambios en la entrada de texto y mostrar sugerencias:
inputNombrePokemon.addEventListener("input", function () {
  var inputText = inputNombrePokemon.value.toLowerCase();

  // Limpiar sugerencias existentes
  datalistPokemon.innerHTML = "";

  // Agregar nuevas sugerencias al datalist
  fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
    .then(response => response.json())
    .then(data => {
      // Filtrar sugerencias basadas en la entrada del usuario
      var suggestions = data.results
        .map(pokemon => pokemon.name)
        .filter(pokemonName => pokemonName.startsWith(inputText));

      suggestions.forEach(function (suggestion) {
        var option = document.createElement("option");
        option.value = suggestion;
        datalistPokemon.appendChild(option);
      });
    })
    .catch(error => console.error('Error al obtener nombres de Pokémon', error));
});

obtenerPokemonRandom();
function obtenerPokemonRandom() {
  // Limpiar el contenido previo
  // Obtener un número aleatorio para el Pokémon
  var pokemonId = Math.floor(Math.random() * generaciones + 1);

  // URL de la PokeAPI para obtener detalles del Pokémon
  var url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonId;

  // URL de la PokeAPI para obtener detalles de la especie del Pokémon
  var urlEspecie = 'https://pokeapi.co/api/v2/pokemon-species/' + pokemonId;

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
spanerror = document.getElementById("error");
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


            tipo2Pokemon = document.createElement("div");
            tipo2Pokemon.classList.add("r2");
            if (tipos[1] == null) tipos[1] = tipos[0];
            tipo2Pokemon.innerText = tipos[1];

            pesopokemon = document.createElement("div");
            pesopokemon.classList.add("r5");
            let peso = pokemon.weight;
            pesopokemon.innerText = peso + "kg";
            divcreation.appendChild(pesopokemon);

            alturapokemon = document.createElement("div");
            alturapokemon.classList.add("r4");
            altura = pokemon.height / 10
            alturapokemon.innerText = altura + " m";
            divcreation.appendChild(alturapokemon);


            console.log(pokemoninicial)

            // Type 1 Comparison
            tipo1Pokemon.classList.add(comprobarestados(tipos[0], pokemoninicial[1], pokemoninicial[2]));

            // Type 2 Comparison
            tipo2Pokemon.classList.add(comprobarestados(tipos[1], pokemoninicial[2], pokemoninicial[1]));
            divcreation.appendChild(tipo2Pokemon);
            divcreation.appendChild(tipo1Pokemon);
            // Generation Comparison
            generacionPokemon.classList.add(gen === pokemoninicial[3] ? "acierto" : "fallo");

            // Weight Comparison
            if (peso !== pokemoninicial[5]) {
              pesopokemon.innerText = (peso > pokemoninicial[5] ? "↓ " : "↑ ") + peso + "kg";
              divcreation.appendChild(pesopokemon);
            } else {
              pesopokemon.innerText = peso + "kg";
              pesopokemon.classList.add("acierto");
              divcreation.appendChild(pesopokemon);
            }

            // Height Comparison
            if (altura !== pokemoninicial[6]) {
              alturapokemon.innerText = (altura > pokemoninicial[6] ? "↓ " : "↑ ") + altura + "m";
              divcreation.appendChild(alturapokemon);
            } else {
              alturapokemon.innerText = altura + "m";
              alturapokemon.classList.add("acierto");
              divcreation.appendChild(alturapokemon);
            }

            divtitulos.insertAdjacentElement('afterend', divcreation);

            if (pokemoninicial[0] == pokemonid) {
              formulario.parentElement.removeChild(formulario);
              contenedoracierto = document.createElement('div');
              
              // Crear la imagen del Pokémon
              sprite = pokemon.sprites.front_default;
              spritepokeon = document.createElement('img');
              spritepokeon.src = sprite;
              spritepokeon.alt = pokemon.name;
              // Crear un párrafo para el nombre del Pokémon
              parrafonombrepoke = document.createElement('p');
              parrafonombrepoke.innerText = pokemon.name.toUpperCase();
              // Añadir la imagen y el párrafo al contenedor
              contenedoracierto.appendChild(spritepokeon);
              contenedoracierto.appendChild(parrafonombrepoke);
              // Añadir el contenedor al elemento con id "spanerror"
              spanerror.appendChild(contenedoracierto);
              sitioform.appendChild(nuevapartida);
              
            } else {
              contenedorfallo = document.createElement('div');
              contenedorfallo.classList.add('resultado2');
              parrafonombrepoke = document.createElement('p');
              sprite = pokemon.sprites.front_default;
              spritepokeon = document.createElement('img');
              spritepokeon.src = sprite;
              spritepokeon.alt = pokemon.name;
              parrafonombrepoke.innerText = pokemon.name.toUpperCase();
              contenedorfallo.appendChild(spritepokeon);
              contenedorfallo.appendChild(parrafonombrepoke);
              document.getElementById("div3").appendChild(contenedorfallo);
            }
          })
      })
  }
});

function comprobarestados(tipo, tipoal1, tipoal2) {

  switch (tipo.trim()) {
    case tipoal1.trim():
      return "acierto"
      break;
    case tipoal2.trim():
      return "semiacierto"
      break;
    default: return "fallo";
  }
};

var boton = document.getElementById("mostrarOcultarBtn");
var leyenda = document.querySelector(".leyenda");

boton.addEventListener("click", function () {
  // Cambiar la visibilidad de la leyenda
  if (leyenda.style.display === "none") {
    leyenda.style.display = "block";
  } else {
    leyenda.style.display = "none";
  }
});

function cambiarTexto() {
  var btn = document.getElementById('mostrarOcultarBtn');
  
  // Verificar el tamaño de la pantalla
  if (window.innerWidth <= 600) {
      btn.innerText = '?';
  } else {
      btn.innerText = 'Instrucciones';
  }
}
cambiartemazo();
function cambiartemazo() {
  document.getElementById("source").setAttribute('src', 'mp3/win.m4a');
}

window.onload = cambiarTexto;
window.onresize = cambiarTexto;