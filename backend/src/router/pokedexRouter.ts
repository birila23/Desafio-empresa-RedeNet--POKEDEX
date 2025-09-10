import { Router } from "express";
import { addPokemonToPokedex, getPokedex, delPokemon } from '../controller/pokedexController';
import { authenticate } from "../middleware/authenticate";

const routerPokedex = Router();

routerPokedex.post('/:userId/add', authenticate, addPokemonToPokedex);
routerPokedex.get("/:userId", authenticate, getPokedex );
routerPokedex.delete("/:userId/remove/:pokemonId", authenticate, delPokemon);

export default routerPokedex;