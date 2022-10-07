// ----------------------RECHERCHER UN POKEMON-----------------------------
document.querySelector('#rechercher').addEventListener('click', findPokemon)

function capitalizeFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1)
}


function toLowerCase(string)
{
    return string.toLowerCase()
}

function findPokemon(e)
{
    const nameValue = document.querySelector('#search').value
    const name = toLowerCase(nameValue)
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((response) => response.json()).then((data) => {
        document.querySelector('#main').innerHTML = `
        <div class="movie">
            <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
            <div class="movie-info">
                <h3>${capitalizeFirstLetter(data.name)}</h3>
                <span>${data.weight}</span>
            </div>
        </div>
        `;
    }).catch((err) => {
        console.log("Pokemon not fount", err)
    })

    e.preventDefault()
} 
// ----------------------RECHERCHER UN POKEMON-----------------------------


//  -------------------------LISTE DES POKEMON-----------------------------
const poke_container = document.getElementById('poke-container')

const poke_number = 150

const colors = {
	fire: '#ff1a1a',
	grass: '#009900',
	electric: '#ffff1a',
	water: '#668cff',
	ground: '#ffffcc',
	rock: '#666633',
	fairy: '#fceaff',
	poison: '#5c00e6',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#d98cc6',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
const main_types = Object.keys(colors);

const fetchPokemons = async () => 
{
    for(let i = 1; i <= poke_number; i++)
    {
        await getPokemon(i)
    }
}

const getPokemon = async id => 
{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const pokemon = await res.json()
    createPokeCard(pokemon)
}

fetchPokemons()


function createPokeCard(pokemon)
{   
    const poke_type = pokemon.types.map(el => el.type.name)
    const type = main_types.find(type => poke_type.indexOf(type) > -1)

    const pokeEl = document.createElement('div')
    pokeEl.classList.add('pokemon')

    const color = colors[type]

    let resdesc = fetch(pokemon["species"]["url"]).then((response) => response.json()).then((data) => {
        pokeEl.innerHTML = `
        <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
        <div class="poke-info">
            <h3>${capitalizeFirstLetter(pokemon.name)}</h3>
            <small class="type"><span style="background-color: ${color}">${type}</span></small>
        </div>
        <div class="overview">
            <h3>Informations</h3>
            <p>${data.flavor_text_entries["16"].flavor_text}</p>
        </div>
    `;

    poke_container.appendChild(pokeEl)
    }

    )  
}
//  -------------------------LISTE DES POKEMON-----------------------------