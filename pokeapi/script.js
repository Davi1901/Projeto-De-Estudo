

const pokedex = document.getElementById('pokedex');
const searchInput = document.getElementById('searchInput');
const totalXpDisplay = document.getElementById('totalXp');
const loading = document.getElementById('loading');

let allPokemons = []; 

async function fetchPokemons() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        if (!response.ok) throw new Error('Erro na requisição');
        
        const data = await response.json();
        
        const detailPromises = data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
        });

        allPokemons = await Promise.all(detailPromises);
        
        loading.style.display = 'none'; 
        render(allPokemons);
        logNames(allPokemons);

    } catch (error) {
        console.error("Erro ao carregar:", error);
        loading.innerHTML = `<div class="error-msg">Erro ao carregar os dados da PokeAPI. Verifique sua conexão.</div>`;
    }
}

function render(pokemonList) {
    pokedex.innerHTML = '';

    if (pokemonList.length === 0) {
        pokedex.innerHTML = '<p class="error-msg">Pokemon não encontrado.</p>';
        totalXpDisplay.innerText = '0';
        return;
    }

    const highXpPoke = pokemonList.find(p => p.base_experience > 150);
    if (highXpPoke) console.log(`Destaque do dia: ${highXpPoke.name}`);

    const cardsHtml = pokemonList.map(pokemon => `
        <div class="card">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h3>${pokemon.name.toUpperCase()}</h3>
            <p><strong>Tipo:</strong> ${pokemon.types.map(t => t.type.name).join(', ')}</p>
            <p><strong>XP:</strong> ${pokemon.base_experience}</p>
        </div>
    `).join('');

    pokedex.innerHTML = cardsHtml;

    const totalXp = pokemonList.reduce((sum, pokemon) => sum + (pokemon.base_experience || 0), 0);
    totalXpDisplay.innerText = totalXp;
}

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    
    const filtered = allPokemons.filter(pokemon => 
        pokemon.name.toLowerCase().includes(term)
    );
    
    render(filtered);
});

function logNames(list) {
    list.forEach(p => console.log(`Pokémon carregado com sucesso: ${p.name}`));
}

fetchPokemons();
