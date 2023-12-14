 // Función para obtener un Pokémon al azar desde la PokeAPI
 function obtenerPokemonRandom() {
    // Limpiar el contenido previo
    document.getElementById("resultado").innerHTML = "";

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
            // Crear elementos HTML para mostrar la información del Pokémon
            var resultadoDiv = document.getElementById("resultado");

            // Nombre del Pokémon
            var nombrePokemon = document.createElement("p");
            nombrePokemon.innerText = "Nombre: " + data.name;
            resultadoDiv.appendChild(nombrePokemon);

            // Número en la Pokédex Nacional
            var numeroPokedex = document.createElement("p");
            numeroPokedex.innerText = "Número en la Pokédex Nacional: " + data.id;
            resultadoDiv.appendChild(numeroPokedex);

            // Generación del Pokémon
            var generacionPokemon = document.createElement("p");
            generacionPokemon.innerText = "Generación: " + obtenerGeneracion(dataEspecie.generation.name);
            resultadoDiv.appendChild(generacionPokemon);

            // Tipos del Pokémon en español
            var tiposPokemon = document.createElement("p");
            tiposPokemon.innerText = "Tipos: " + data.types.map(type => tiposEnEspanol[type.type.name]).join(", ");
            resultadoDiv.appendChild(tiposPokemon);

            // Habilidades del Pokémon
            var habilidadesPokemon = document.createElement("p");
            habilidadesPokemon.innerText = "Habilidades: " + data.abilities.map(ability => ability.ability.name).join(", ");
            resultadoDiv.appendChild(habilidadesPokemon);

            // Sprite del Pokémon
            var spritePokemon = document.createElement("img");
            spritePokemon.src = data.sprites.front_default;
            spritePokemon.alt = "Sprite del Pokémon";
            resultadoDiv.appendChild(spritePokemon);

            // Puedes agregar más detalles según sea necesario

          })
          .catch(errorEspecie => console.error('Error al obtener detalles de la especie del Pokémon', errorEspecie));
      })
      .catch(error => console.error('Error al obtener detalles del Pokémon', error));
  }

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