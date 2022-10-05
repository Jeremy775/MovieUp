document.querySelector('#rechercher').addEventListener('click', getPokemon)

function capitalizeFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1)
}


function toLowerCase(string)
{
    return string.toLowerCase()
}

function getPokemon(e)
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