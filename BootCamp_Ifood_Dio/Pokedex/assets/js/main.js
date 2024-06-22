const pokemonList = document.getElementById('pokemonList');
        const loadMoreButton = document.getElementById('loadMoreButton');
        const limit = 5;
        let offset = 0;

        function loadPokemonsItens(offset, limit) {
            pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
                const newHtml = pokemons.map((pokemon, index) => `
                    <div class="flip" id="card-${offset + index}">
                        <div class="card">
                            <div class="face front">
                                <li class="pokemon ${pokemon.type}">
                                    <span class="number">${pokemon.number}</span>
                                    <span class="name">${pokemon.name}</span>
                                    <div class="detail">
                                        <ol class="types">
                                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                                        </ol>
                                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                                    </div>
                                </li>
                            </div>
                            <div class="face back ${pokemon.type}">
                                FUNDO
                            </div>
                        </div>
                    </div>
                `).join('');
                pokemonList.innerHTML += newHtml;

                pokemons.forEach((_, index) => {
                    const card = document.getElementById(`card-${offset + index}`);
                    card.addEventListener("click", () => {
                        card.querySelector('.card').classList.toggle("flip-card");
                    });
                });
            });
        }

        loadPokemonsItens(offset, limit);

        loadMoreButton.addEventListener('click', () => {
            offset += limit;
            loadPokemonsItens(offset, limit);
        });