// variaveis
const MAX_POKEMON=151;
const listWrapper = document.querySelector('.list-wrapper')
const searchPokemon= document.querySelector('#search-input')

const numberFilter= document.querySelector('#number')
const nameFilter= document.querySelector('#name')
const notFoundMessage= document.querySelector('#not-found-message')
const close = document.querySelector('search-close-icon')

let allPokemon= [];

searchPokemon.addEventListener("keyup", ()=>{
        const searchTerm = searchPokemon.value.toLowerCase();
        let filteredPokemons;

        if(numberFilter.checked){
            filteredPokemons= allPokemon.filter((pokemon)=>{

                const pokemonId=pokemon.url.split("/")[6];
                return pokemonId.startsWith(searchTerm);


            });
        }else if(nameFilter.checked){
            filteredPokemons= allPokemon.filter((pokemon)=>{

               return pokemon.name.toLowerCase().startsWith(searchTerm)

            });
      
        }else{

                filteredPokemons=allPokemon;

        }

        displayPokemon(filteredPokemons);

        if(filteredPokemons.length===0){

            notFoundMessage.style.display="block"

        }else{
            notFoundMessage.style.display="none"
        }

});

// Funções
const fetchPokemon =async()=>{

            const responsi = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
            const data = await responsi.json();
            allPokemon=data.results;
            displayPokemon(allPokemon)
            
            
}


const fetchPokemonDataBeforeRedirect = async (id)=>{

    try{
        const [pokemon, pokemonSpecies]= await Promise.all([
                fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then((res)=>res.json),
                fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then((res)=>res.json),
        ]);
        return true;

    }catch(error){
    console.log( "Failed to fetch Pokemon data before redirect" )

    }

}


function displayPokemon(pokemon){
    listWrapper.innerHTML="";



    pokemon.forEach((pokemon) => {
        const pokemonID = pokemon.url.split("/")[6];
        const listItem = document.createElement("div");
        listItem.className= "list-item";
        listItem.innerHTML=`
        
                <div class = "number-wrap"> 
                
                        <p class="caption-fonts">#${pokemonID}</p>
                
                </div>

                <div class = "img-wrap"> 
                
                        <img  src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}"  />
                
                </div>
                <div class = "name-wrap"> 
                
                        <p class="body3-fonts">#${pokemon.name}</p>
                
                </div>
        
        
        
        
        `;

        listItem.addEventListener("click", async(event)=>{
            const success = await fetchPokemonDataBeforeRedirect(pokemonID);

            if(success){
                window.location.href=`./detail.html?id=${pokemonID}`


            }

        });


        listWrapper.appendChild(listItem);

    });





}




fetchPokemon()