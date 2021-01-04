const Pokemon = require("./../models/pokeModel");

class PokeService {
  createPokemon(pokemon) {
    const newPokemon = new Pokemon(pokemon);
    return newPokemon.save();
  }

  getPokemones(offset, limit) {
    const query = Pokemon.find({}).skip(offset).limit(limit).exec();
    return query;
  }

  modifyPokemon(pokemon) {
      const updatePokemon = Pokemon.findOneAndUpdate({ name: pokemon.name }, pokemon).exec();
      return updatePokemon;
  }

  deletePokemon(pokemon) {
    const disabledPokemon = Pokemon.findOneAndUpdate(
      //encontré ese or por si viene una cosa o la otra por params
      {$or:[{ pokemonId: pokemon.id },{name: pokemon.name}]}, pokemon).exec();
      return disabledPokemon;
  }
}

module.exports = PokeService;