const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const pokemonTypes = document.querySelector('.pokemon_type');

const form = document.querySelector('.form');
const input = document.querySelector('.input_pokemon');

let searchPokemon = 1;

var findTypes = (data) => {
    
    var types = "";

    for ( const property in data['types']){
        for ( const property2 in data['types'][property]){
            if ( property2 == "type"){
                for ( const property3 in data['types'][property][property2]){
                    if ( property3 == "name" ){
                        if ( types == ""){
                            types = types + data['types'][property][property2][property3];
                        } else {
                            types = types + " | " + data['types'][property][property2][property3];
                        }
                    }
                }
            }
        }
    }

    return types;
}

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);
  
    if (data && parseInt(data['id']) <= 151 ) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data['name'];
        pokemonNumber.innerHTML = data['id'] + " -";
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonTypes.innerHTML = findTypes(data);
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Pokemon not found';
        pokemonNumber.innerHTML = '';
        pokemonTypes.innerHTML = '';
    }
  
    
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});
  
  
renderPokemon(searchPokemon);