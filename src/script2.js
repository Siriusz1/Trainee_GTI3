
const teamName = localStorage.getItem('teamName');
const dadosString = localStorage.getItem('cardSelecionados');
const cardSelecionadosRecebidos = JSON.parse(decodeURIComponent(dadosString));
console.log(cardSelecionadosRecebidos)

const pokeContainer = document.querySelector(".pokeContainer");
const colors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
}
const idPokemons = []
const pokemonData = [];
const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
    const response = await fetch(url);
    const data = await response.json();
    
    
    const pokemonDetails = data.results;

    for (const pokemon of pokemonDetails) {
        await getPokemons(pokemon.url);
    }
}


const getPokemons = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    pokemonData.push(data);
    createPokemonCard(data);
}
const createPokemonCard = (poke) => {
    const id = poke.id.toString().padStart(3, '0');
    const idConvertido = parseInt(id);
    for(let i = 0; i < cardSelecionadosRecebidos.length; i++){
    if (cardSelecionadosRecebidos[i] == idConvertido) {
        const card = document.createElement('div');
        card.classList.add("w-72", "h-72", "shadow-lg", "relative", "rounded-lg", "m-10");

        const name = poke.name[0].toUpperCase() + poke.name.slice(1);

        const hp = poke.stats[0].base_stat;
        const attack = poke.stats[1].base_stat;
        const defense = poke.stats[2].base_stat;
        const speed = poke.stats[3].base_stat;

        const pokeTypes = poke.types.map(type => type.type.name);
        let type1 = null;
        let type2 = null;

        if (pokeTypes.length > 0) {
            type1 = mainTypes.find(type => pokeTypes.indexOf(type) > -1);
        }

        if (pokeTypes.length > 1) {
            type2 = mainTypes.find(type => type !== type1 && pokeTypes.indexOf(type) > -1);
        } else {
            type2 = type1;
        }

        const color = colors[type1];
        const cardId = 'card';

        const gradientStyle = `radial-gradient(circle at 50% -5%, ${color} 40%, #ffffff 36%)`;
        card.innerHTML = `
            <div id="${cardId}" class="  card_template bg-gradient p-8 rounded-lg cursor-pointer" style="background: ${gradientStyle}; height: 400px">
                <p class="hp w-20 h-20 bg-white text-center p-2 px-0 rounded-[30px] ml-auto font-normal">
                    <span class="text-xs tracking-tight font-semibold">HP</span>
                    ${hp}
                </p>
                <img class="block w-[90px] h-[90px] p-[5%]relative mx-auto" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${poke.id}.gif" alt="" style="width:90px">
                <div style="margin-top: 20%" >
                    <div class="number flex justify-center mb-2">
                        <span class="bg-gray-400 poke-name text-center font-semibold flex items-center justify-center rounded-3xl w-12">${id}</span>
                    </div>
                    <h2 class="poke-name text-center font-semibold">${name}</h2>
                    <div class="types flex justify-around mt-5 mb-10">
                        <span class="text-xs tracking-tight font-semibold">${type2}</span>
                        <span class="text-xs tracking-tight font-semibold">${type1}</span>
                    </div>
                    <div class="stats flex items-center justify-between text-center">
                        <div>
                            <h3>${attack}</h3>
                            <p class="text-stone-500">Attack</p>
                        </div>
                        <div>
                            <h3>${defense}</h3>
                            <p class="text-stone-500">Defense</p>
                        </div>
                        <div>
                            <h3>${speed}</h3>
                            <p class="text-stone-500">Speed</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        pokeContainer.appendChild(card);
        }
    }
}

const nome = document.querySelector('.time-name');
    nome.innerHTML = teamName;
fetchPokemons();