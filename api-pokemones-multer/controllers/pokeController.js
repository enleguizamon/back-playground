const { default: axios } = require("axios");

class PokeController {
  constructor(pokeService) {
    this.pokeService = pokeService;
  }

  async createPokemon(req, res) {
    try {
      const { name } = req.body;
      //si no enviaba image en el form, me tiraba el error que no había file y caía
      //en el catch.Lo soluciono viendo la existencia de file
      const image = req.file ? req.file.path : undefined;
      //si no envío name, cae bien en este error, pero igual guarda la imagen sin nombre
      if (!name || !image) {
        res.status(401).send("nombre e imagen requeridos");
      }

      const newPokemon = {
        name: name,
        image: image,
      };

      const response = await this.pokeService.createPokemon(newPokemon);

      if (response) {
        return res.status(201).send("pokemon creado");
      } else {
        return res.status(400).send("error en la creación del pokemon");
      }
    } catch (e) {
      console.log(e);
      res.status(500).send("error inesperado");
    }
  }

  async getPokemones(req, res) {
    try {
      const limit = parseInt(req.query.limit);
      const page = parseInt(req.query.page);
      let offset = limit * (page - 1);

      const pokemones = await this.pokeService.getPokemones(offset, limit);
      if (pokemones) {
        res.status(200).json(pokemones);
      } else {
        return res.status(400).send("No hay pokemones");
      }
    } catch (e) {
      console.log(e);
      res.status(500).send("error inesperado");
    }
  }

  async modifyPokemon(req, res) {
    try {
      const pokeApi = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${req.params.id}`
      );
      const pokemon = {
        pokemonId: pokeApi.data.id,
        name: pokeApi.data.forms[0].name,
        image: pokeApi.data.sprites.front_default,
        height: pokeApi.data.height,
        weight: pokeApi.data.weight,
        type: pokeApi.data.types[0].type.name,
      };

      const modify = await this.pokeService.modifyPokemon(pokemon);
      //si no existe el pokemon en la db, lo creo con el createPokemon
      if (!modify) {
        const response = await this.pokeService.createPokemon(pokemon);
        return res.status(201).send(response);
      } else {
        return res.status(201).send(modify);
      }
    } catch (e) {
      console.log(e);
      res.status(500).send("error inesperado");
    }
  }

  async deletePokemon(req, res) {
    try {
      const { id, name } = req.query;
      const pokemon = {
        id: id,
        name: name,
        disabled: true,
      };

      const deleted = await this.pokeService.deletePokemon(pokemon);
      if (!deleted) {
        return res.status(400).send("no se encontró el pokemon a desabilitar");
      } else {
        return res.status(200).send("se desabilitó el pokemon");
      }
    } catch (e) {
      console.log(e);
      res.status(500).send("error inesperado");
    }
  }
}

module.exports = PokeController;
