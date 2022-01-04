import './App.css';
import { useState } from "react";
import Axios from "axios";

function App() {

  const [pokemonName, setPokemonName]  = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "", 
    species: "", 
    img: "", 
    hp: "", 
    attack: "",
    defense: "",
    special_attack: "",
    special_defense: "",
    speed: "",
    type: ""
  })

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response) => {
        setPokemon({
          name: pokemonName, 
          species: response.data.species.name, 
          img: response.data.sprites.front_default, 
          hp: response.data.stats[0].base_stat, 
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          special_attack: response.data.stats[3].base_stat,
          special_defense: response.data.stats[4].base_stat,
          speed: response.data.stats[5].base_stat,
          type: response.data.types[0].type.name 
        });
        setPokemonChosen(true);
      }
    );
  };

  return (
    <div className='App'>
      <div className='Title'>
        <h1>Pokemon Stats</h1>
        <input 
          type="text"
           onChange={(event) => {
             setPokemonName(event.target.value);
           }} 
          />
        <button onClick={searchPokemon}>Who's That Pokemon?</button>
      </div>
        <div className='Display'>
           {!pokemonChosen ? (<h1>Please choose a Pokemon</h1>
           ) : (
             <>
               <h1>{pokemon.name}</h1>
               <img alt='Pokemon Sprite' src={pokemon.img} />
               <h3>Species: {pokemon.species}</h3>
               <h3>Type: {pokemon.type}</h3>
               <h4>Hp: {pokemon.hp}</h4>
               <h4>Attack: {pokemon.attack}</h4>
               <h4>Defense: {pokemon.defense}</h4>
               <h4>Special-attack: {pokemon.special_attack}</h4>
               <h4>Special-defense: {pokemon.special_defense}</h4>
               <h4>Speed: {pokemon.speed}</h4>
            </>
              )} 
        </div>
    </div>
  );
}

export default App;
