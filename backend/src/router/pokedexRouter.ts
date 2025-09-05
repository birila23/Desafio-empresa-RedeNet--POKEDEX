import { Router } from "express";
import { addPokemonToPokedex, getPokedex, delPokemon } from '../controller/pokedexController';

const routerPokedex = Router();

routerPokedex.post('/:userId/add', addPokemonToPokedex);
routerPokedex.get("/:userId", getPokedex);
routerPokedex.delete("/:userId/remove/:pokemonId", delPokemon);

export default routerPokedex;