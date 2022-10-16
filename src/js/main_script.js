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
        attack:poke.stats[1].base_stat +`K`,
        special:poke.stats[3].base_stat +`K`,
        defense:poke.stats[2].base_stat +`K`,       
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
        pokecard$$.setAttribute ('data-aos', 'fade-up', '1000');
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
}
const buttonsPokemons = (type,pokemons) => {
    const btnPokemons = pokemons.filter((pokemon) => pokemon.type == type);
    drawPokemons(btnPokemons); 
 }
// total function to add/gather all the details of the query.
async function init() {
    const pokemons = await getPokemons(151);
    console.log(pokemons);
    const mappedPokemons = mapPokemons(pokemons);
    //console.log(mappedPokemons);
    drawPokemons(mappedPokemons);
    let input$$ = document.querySelector('input');
    input$$.addEventListener('keyup', () => searchPokemons(input$$.value, mappedPokemons));
    let fire$$ = document.querySelector('.firePokemon');
    fire$$.addEventListener('click', () => searchPokemons("fire", mappedPokemons));
    let normal$$ = document.querySelector('.normalPokemon');
    normal$$.addEventListener('click', () => searchPokemons("normal", mappedPokemons));
    let fighting$$ = document.querySelector('.fightingPokemon');
    fighting$$.addEventListener('click', () => searchPokemons("fighting", mappedPokemons));
    let flying$$ = document.querySelector('.flyingPokemon');
    flying$$.addEventListener('click', () => searchPokemons("flying", mappedPokemons));
    let poison$$ = document.querySelector('.poisonPokemon');
    poison$$.addEventListener('click', () => searchPokemons("poison", mappedPokemons));
    let rock$$ = document.querySelector('.rockPokemon');
    rock$$.addEventListener('click', () => searchPokemons("rock", mappedPokemons));
    let bug$$ = document.querySelector('.bugPokemon');
    bug$$.addEventListener('click', () => searchPokemons("bug", mappedPokemons));
    let ghost$$ = document.querySelector('.ghostPokemon');
    ghost$$.addEventListener('click', () => searchPokemons("ghost", mappedPokemons));
    let steel$$ = document.querySelector('.steelPokemon');
    steel$$.addEventListener('click', () => searchPokemons("steel", mappedPokemons));
    let water$$ = document.querySelector('.waterPokemon');
    water$$.addEventListener('click', () => searchPokemons("water", mappedPokemons));
    let grass$$ = document.querySelector('.grassPokemon');
    grass$$.addEventListener('click', () => searchPokemons("grass", mappedPokemons));
    let electric$$ = document.querySelector('.electricPokemon');
    electric$$.addEventListener('click', () => searchPokemons("electric", mappedPokemons));
    let psychic$$ = document.querySelector('.psychicPokemon');
    psychic$$.addEventListener('click', () => searchPokemons("psychic", mappedPokemons));
    let ice$$ = document.querySelector('.icePokemon');
    ice$$.addEventListener('click', () => searchPokemons("ice", mappedPokemons));
    let dragon$$ = document.querySelector('.dragonPokemon');
    dragon$$.addEventListener('click', () => searchPokemons("dragon", mappedPokemons));
    let dark$$ = document.querySelector('.darkPokemon');
    dark$$.addEventListener('click', () => searchPokemons("dark", mappedPokemons));
    let fairy$$ = document.querySelector('.fairyPokemon');
    fairy$$.addEventListener('click', () => searchPokemons("fairy", mappedPokemons));
    let ground$$ = document.querySelector('.groundPokemon');
    ground$$.addEventListener('click', () => searchPokemons("ground", mappedPokemons));
    AOS.init();
}
init();
