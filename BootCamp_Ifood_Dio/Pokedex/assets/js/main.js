const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 5;
let offset = 0;



        function flip() {
            const cards = document.querySelectorAll('.flip');
            cards.forEach((card) => {
                card.addEventListener("click", () => {
                    card.querySelector('.card').classList.toggle("flip-card");
                });
            });
        }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        
        function capitalizeWords(string) {
            return string.split(' ').map(capitalizeFirstLetter).join(' ');
        }

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
                            <div class="back-content">
                                <span class="base_experience"> Experiência: ${pokemon.base_experience}</span>
                                <span class="height">Tamanho: ${pokemon.height}</span><br>
                                Habilidades:
                                <div class="abilities">
                                    ${pokemon.abilities.map((ability) => `<li class="ability">${capitalizeWords(ability)}</li>`).join('')}
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                `).join('');
                pokemonList.innerHTML += newHtml;
                flip();
            });
        }
    

        loadPokemonsItens(offset, limit);
        
        loadMoreButton.addEventListener('click', () => {
            offset += limit;
            loadPokemonsItens(offset, limit);
        });