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
    const pokeEl = document.createElement('div')
    pokeEl.classList.add('pokemon')
    pokeEl.innerHTML = `
        <div class="pokemon">
            <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
            <div class="poke-info">
                <h3>${capitalizeFirstLetter(pokemon.name)}</h3>
                <span>poids: ${pokemon.weight} kg</span>
            </div>
        </div>
    `

    poke_container.appendChild(pokeEl)
}
//  -------------------------LISTE DES POKEMON-----------------------------