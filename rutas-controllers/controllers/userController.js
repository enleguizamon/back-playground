const axios = require("axios");

class UserController {
  getName(req, res) {
    res.send(`${req.params.name} tiene ${req.query.edad}`);
  }

  multiply(req, res) {
    res.send(`${req.params.number * 2}`);
  }

  palindrome(req, res) {
    let word = req.params.word;
    let reverseWord = word.split("").reverse().join("");

    if (word == reverseWord) {
      res.send(
        `${word} es un palíndromo ya que al revés se lee: ${reverseWord}.`
      );
    } else {
      res.send(
        `La frase ${word} NO es un palíndromo ya que al revés se lee: ${reverseWord}.`
      );
    }
  }

  primos(req, res) {
    let count = 5;
    let respuesta = {};
    respuesta.primos = [];

    for (let i = 2; i <= 150; i++) {
      if (i == 2 || i == 3 || i == 5 || i == 7 || i == 11) {
        respuesta.primos.push(i);
      } else if (
        i % 2 != 0 &&
        i % 3 != 0 &&
        i % 5 != 0 &&
        i % 7 != 0 &&
        i % 11 != 0
      ) {
        respuesta.primos.push(i);
        count++;
      }
    }
    respuesta.resultado = `Entre 1 y 150 hay ${count} números primos`;
    res.json(respuesta);
  }

  async getUser(req, res) {
    const github = await axios.get(
      `https://api.github.com/users/${req.params.id}`
    );
    res.json(github.data);
  }

  async getUserDetails(req, res) {
    const github = await axios.get(
      `https://api.github.com/users/${req.params.id}`
    );
    const details = {
      nombre: github.data.name,
      empresa: github.data.company,
      bio: github.data.bio,
      edad: 33,
      "gusto de helado favorito": "dulce de leche",
    };
    res.json(details);
  }

  async getPokePrimo(req, res) {
    let primos = [];

    for (let i = 2; i <= 150; i++) {
      if (i == 2 || i == 3 || i == 5 || i == 7 || i == 11) {
        primos.push(i);
      } else if (
        i % 2 != 0 &&
        i % 3 != 0 &&
        i % 5 != 0 &&
        i % 7 != 0 &&
        i % 11 != 0
      ) {
        primos.push(i);
      }
    }

    const getPokemonData = async (num) => {
      let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`);
      let name = pokemon.data.name;
      return {
        primeNumber: num,
        pokemonName: name,
      };
    };

    const getAllPokemonsData = async () => {
      return Promise.all(primos.map((num) => getPokemonData(num)));
    };

    let respuesta = await getAllPokemonsData();
    res.json(respuesta);
  }
}

module.exports = UserController;
