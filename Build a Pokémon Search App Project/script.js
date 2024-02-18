const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");

const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpecialAttack = document.getElementById("special-attack");
const pokemonSpecialDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");

const imageContainer = document.getElementById("img-container");

const stats = {
    hp: pokemonHp,
    attack: pokemonAttack,
    defense: pokemonDefense,
    specialAttack: pokemonSpecialAttack,
    specialDefense: pokemonSpecialDefense,
    speed: pokemonSpeed
}

const pokemonsBaseUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

const fetchPokemon = async () => {
    try{
        const res = await fetch(`${pokemonsBaseUrl}${searchInput.value.toLowerCase()}`);
        const data = await res.json();
        showPokemonInfo(data);
    } catch (err){
        alert("Pokémon not found");
    }
}

const getPokemon = () => {
    if(searchInput.value === ""){
        alert("Input is empty");
        return;
    }
    fetchPokemon();
}

const showPokemonInfo = (data) => {
    clearFields(data);
    pokemonName.innerText = `${data.name.toUpperCase()}`;
    pokemonId.innerText = `${data.id}`;
    pokemonWeight.innerText = `${data.weight}`;
    pokemonHeight.innerText = `${data.height}`;
    
    for(let typeObj of data.types){
        pokemonTypes.innerHTML += `<span>${typeObj.type.name.toUpperCase()}</span> `;
    }
    
    imageContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" />`;

    for(let statObj of data.stats){
        stats[fromHyphenatedToCamelCase(statObj.stat.name)].innerText = `${statObj.base_stat}`;
    }
}

const clearFields = (data) => {
    pokemonName.innerText = "";
    pokemonId.innerText = "";
    pokemonWeight.innerText = "";
    pokemonHeight.innerText = "";
    
    pokemonTypes.innerHTML = "";

    imageContainer.innerHTML = "";

    for(let statObj of data.stats){
        stats[fromHyphenatedToCamelCase(statObj.stat.name)].innerText = "";
    }
}

const toUpperCaseFirstLetter = (str) => {
    return str[0].toUpperCase() + str.slice(1);
}

const fromHyphenatedToCamelCase = (str) => {
    const words = str.split("-");
    const firstWord = words.shift();
    for (let i=0; i< words.length; i++){
        words[i] = toUpperCaseFirstLetter(words[i]);
    }
    return firstWord + words.join("");
}

searchButton.addEventListener("click", getPokemon);