const userId = localStorage.getItem("userId");
const userName = localStorage.getItem("userName");
document.getElementById("user-name").textContent = userName;

async function getPokemon(){
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const data = await response.json()
    console.log(data.name);

    const container = document.getElementById("pokemon-list");
    container.innerHTML = "";

    for (const p of data.results) {
        const pokeData = await fetch(p.url).then(res => res.json());

        const card = document.createElement("div");
        card.classList.add("pokemon-card");
        card.innerHTML = `
        <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}">
        <p>${pokeData.name}</p>
        <button onclick="addToPokedex('${pokeData.id}', '${pokeData.name}')">Adicionar</button>
        `;
        container.appendChild(card);
        console.log(card);
    }
}
getPokemon();