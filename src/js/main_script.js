//dark mode
function toggleDarkLight() {
    var body = document.getElementById("body");
    var currentClass = body.className;
    // var divClass = div.className
    body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
}
// async await for the API elements
const getPokemon = async (id) => {
    try {
        const pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokeJson = await pokeResponse.json();
        //console.log(pokeJson);
        return pokeJson;
    }   
        catch (error){
        alert('¡Ha habido un error de conexión!', error)
    }
}
// function async for the array's mapping 
const getPokemons = async (number) => {
    let pokeArray = [];
    for (let i = 1; i <= number ; i++) {
        const pokemon = await getPokemon(i); 
        pokeArray.push(pokemon);
  }
  return pokeArray;
}
// mapping function to simplify API details
const mapPokemons = (pokemon) => {
    const mappedPokemons = pokemon.map((poke) => ({
        id: `#${poke.id.toString().padStart(4, 0)}`,
        name: `${poke.name[0].toUpperCase()+poke.name.slice(1)}`,
        sprite:poke.sprites.other.dream_world.front_default,
        type:poke.types[0].type.name,
        hp:poke.stats[0].base_stat +` Hp`,
        exp:poke.base_experience +` Exp`,
        attack:poke.stats[1].base_stat +` K`,
        special:poke.stats[3].base_stat +` K`,
        defense:poke.stats[2].base_stat +` K`,       
  })) 
  return mappedPokemons;  
}
// drawing the API cards
const drawPokemons = (pokemons) => {
    let gallery$$ = document.querySelector(".poke-gallery");
    gallery$$.classList.add('poke-gallery')
    gallery$$.innerHTML = '';
  for (const pokemon of pokemons) {
    let pokecard$$ = document.createElement("div");
        pokecard$$.className = "b-poke-card";
        pokecard$$.innerHTML = ` 
          <div class="b-poke-card-header">
          </div>
          <div class="b-poke-card-body">
          <div class="b-poke-card__imgframe">
          <img src="${pokemon.sprite}" alt="${pokemon.name}" class="b-poke-card__img">
          </div>
          <h1 class="b-poke-card__title">
              ${pokemon.name}
              <span>${pokemon.hp}</span>
          </h1>
          <p class="b-poke-card__text">${pokemon.id}</p>
          <p class="b-poke-card__type">${pokemon.type}</p>
          </div>
          <div class="b-poke-card-footer">
          <div class="b-poke-card__skills">
              <h3>${pokemon.attack}</h3>
              <p>attack</p>
          </div>
          <div class="b-poke-card__skills">
              <h3>${pokemon.special}</h3>
              <p>Special</p>
          </div>
          <div class="b-poke-card__skills">
              <h3>${pokemon.defense}</h3>
              <p>Defense</p>
          </div>
      </div>
      `    
  gallery$$.appendChild(pokecard$$);
  }

}
//Search
const searchPokemons = (search, pokemons) => {
    const filteredPokemons = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(search.toLowerCase()) || pokemon.type.toLowerCase().includes(search.toLowerCase()) || pokemon.id.toLowerCase().includes(search.toLowerCase()));
    drawPokemons(filteredPokemons); 

    // const firePokemons = pokemons.filter((pokemon) => pokemon.type == "fire");
    // drawPokemons(firePokemons); 
    // const normalPokemons = pokemons.filter((pokemon) => pokemon.type == "normal");
    // drawPokemons(normalPokemons); 
    // const fightingPokemons = pokemons.filter((pokemon) => pokemon.type == "fighting");
    // drawPokemons(fightingPokemons); 
    // const flyingPokemons = pokemons.filter((pokemon) => pokemon.type == "flying");
    // drawPokemons(flyingPokemons); 
}


const buttonPokemon = (search, pokemons) => {
    const firePokemons = pokemons.filter((pokemon) => pokemon.type == "fire");
    drawPokemons(firePokemons); 
 }
// total function to add/gather all the details of the query.
const init = async () => {
    const pokemons = await getPokemons(151);
    console.log(pokemons);
    const mappedPokemons = mapPokemons(pokemons)
    //console.log(mappedPokemons);
    drawPokemons (mappedPokemons); 
    let input$$ = document.querySelector('input');
    input$$.addEventListener('keypress', () => searchPokemons(input$$.value, mappedPokemons));

    let fire$$ = document.querySelector('.firePokemon');
    gallery$$.classList.add('firePokemon')
    fire$$.addEventListener('click', () => buttonPokemons(fire$$.value, mappedPokemons));
    let normal$$ = document.querySelector('.normalPokemon');
    normal$$.addEventListener('click', () => searchPokemons(normal$$.value, mappedPokemons));
    
    // let fighting$$ = document.querySelector('.fightingPokemon');
    // fighting$$.addEventListener('click', () => searchPokemons(fighting$$.value, mappedPokemons));
    // let flying$$ = document.querySelector('.flyingPokemon');
    // flying$$.addEventListener('click', () => searchPokemons(flying$$.value, mappedPokemons));
  }
init();
