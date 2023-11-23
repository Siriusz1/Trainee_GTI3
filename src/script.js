let contador = 1;
const pokeContainer = document.querySelector(".pokeContainer");
const pokemonCount = 150;
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
const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const pokemonData = [];
const mainTypes = Object.keys(colors);
const cardSelecionados = [];
const isCardSelecionado = (id) => {
    return cardSelecionados.includes(id);
};
let cardRemovido;

const fetchPokemons = async () =>{
    for(let i = 1; i <= pokemonCount; i++){
        await getPokemons(i)
    }
}


const getPokemons = async (id) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    pokemonData.push(data);
    createPokemonCard(data);
}

const createPokemonCard = (poke) => {
    const card = document.createElement('div');
    card.classList.add("w-72","h-72", "shadow-lg", "relative", "rounded-lg", "m-10");

    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const id = poke.id.toString().padStart(3, '0');

    const hp = poke.stats[0].base_stat;
    const attack = poke.stats[1].base_stat;
    const defense = poke.stats[2].base_stat;
    const speed =poke.stats[3].base_stat;


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
    const cardId = 'card'

    const gradientStyle = `radial-gradient(circle at 50% -5%, ${color} 40%, #ffffff 36%)`;
    card.innerHTML = `
        <div id="${cardId}" class=" card_template bg-gradient p-8 rounded-lg cursor-pointer" style="background: ${gradientStyle};">
            <p class="hp w-20 bg-white text-center p-2 px-0 rounded-[30px] ml-auto font-normal">
                <span class="text-xs tracking-tight font-semibold">HP</span>
                ${hp}
            </p>
            <img class="block w-52 max-h-48 relative mx-auto" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
            <div class="number flex justify-center mb-2">
                <span class="bg-gray-400 poke-name text-center font-semibold flex items-center justify-center rounded-3xl w-12">${id}</span>
            </div>
            <h2 class="poke-name text-center font-semibold">${name}</h2>
            <div class="types flex justify-around mt-5 mb-10">
                <span class="text-xs tracking-tight font-semibold">${type1}</span>
                <span class="text-xs tracking-tight font-semibold">${type2}</span>
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
    `;

    pokeContainer.appendChild(card);


    card.addEventListener('click',()=>{
        console.log(id);
    if(cardSelecionados.length >= 0 && cardSelecionados.length < 6){
        if (!isCardSelecionado(id)) {
        cardSelecionados.push(parseInt(id))
        document.querySelector('.poke' + contador).setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`);
        contador +=1;
        console.log(cardSelecionados);  
        } else{
        }
    } else{
        cardRemovido = cardSelecionados.shift()
        contador = 1;
        cardSelecionados.push(parseInt(id));
        for(let i = 1; i <= 5; i++){
            document.querySelector('.poke' + i).setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${cardSelecionados[i-1]}.png`);
            console.log(cardSelecionados[i]);
            console.log(id)
        }
        console.log("Este foi o card Removido: "+ cardRemovido)
        console.log(cardSelecionados);  
        }
    });
}


input.oninput = () => {
    pokeContainer.innerHTML = "";

    pokemonData
        .filter((item) =>
            item.name.toLowerCase().includes(input.value.toLowerCase())
        )
        .forEach((item) => createPokemonCard(item));

    pokemonData
        .filter((item) =>
            item.id.toString().padStart(3, '0').includes(input.value.toLowerCase())
        )
        .forEach((item) => createPokemonCard(item));
}

fetchPokemons();