const userId = localStorage.getItem("userId");
const userName = localStorage.getItem("userName");
document.getElementById("user-name").textContent = userName;

async function getPokemon(){
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await response.json();

    const container = document.getElementById("pokemon-list");
    container.innerHTML = "";

    for (const p of data.results) {
        const pokeData = await fetch(p.url).then(res => res.json());

        const card = document.createElement("div");
        card.classList.add("pokemon-card");
        card.innerHTML = `
        <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}">
        <p>${pokeData.name}</p>
        <button onclick="addPokedex('${pokeData.id}', '${pokeData.name}')">Adicionar</button>
        `;
        container.appendChild(card);
        console.log(card);
    }
}
async function userPokedex() {
    const response = await fetch(`http://localhost:3333/pokedex/${userId}`);
    if (!response.ok) throw new Error("Erro ao buscar Pokedex");

    const data = await response.json();
    console.log("Dados da Pokedex recebidos", data);

    // aceita tanto { pokemons: [...] } quanto apenas um array
    const pokemons = data.pokemons || data;

    const container = document.getElementById("pokedex-list");
    container.innerHTML = "";

    if (!pokemons || pokemons.length === 0) {
      container.innerHTML = "<p>Nenhum Pokémon na sua Pokédex ainda.</p>";
      return;
    }

    //renderiza todos os pokémons
    for (const poke of pokemons) {
      try {
        const pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke.codeAPI}`);
        if (!pokeResponse.ok) continue;
        const pokeData = await pokeResponse.json();

        const card = document.createElement("div");
        card.classList.add("pokemon-card");
        card.innerHTML = `
          <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}">
          <h3>${pokeData.name}</h3>
          <button onclick="removeFromPokedex('${poke.id}')">Remover</button>
        `;
        container.appendChild(card);
      } catch (err) {
        console.error("Erro ao buscar detalhes do Pokémon:", err);
      }
    }
}

async function addPokedex(pokemonId, name) {
  await fetch(`http://localhost:3333/pokedex/${userId}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ codeAPI: pokemonId })
  });

  alert(`${name} adicionado à sua Pokédex!`);
  userPokedex();
}

async function removeFromPokedex(pokemonId) {
    const response = await fetch(`http://localhost:3333/pokedex/${userId}/remove/${pokemonId}`, {
      method: "DELETE"
    });

    if (!response.ok) throw new Error("Erro ao remover Pokémon");

    alert("Pokémon removido!");
    userPokedex();
}

// carregar pokemons e a pokedex ao abrir
document.addEventListener("DOMContentLoaded", () => {
  getPokemon();
  userPokedex();
});
