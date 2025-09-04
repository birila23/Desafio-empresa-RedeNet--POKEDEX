import { Request, response, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addPokemonToPokedex = async(req: Request, res: Response) =>{
    try{
        const { userId } = req.params;
        const { codeAPI } = req.body;

        // Buscar a pokedex do usuário
        const pokedex = await prisma.pokedex.findUnique({ where: { userId } });

        if(!pokedex) return res.status(404).json({message: "Pokedex não encontrada"});

        const pokemon = await prisma.pokemon.create({
            data: {
            codeAPI,
            pokedex: { connect: { id: pokedex.id } },
            },
        });
        res.status(201).json(pokemon);
    }
    catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao adicionar Pokémon" });
  }
}

export const getPokedex = async(req: Request, res: Response) => {
    try{
        const { userId } = req.params;
        const pokedex = await prisma.pokedex.findUnique({
            where: { userId },
            include: {pokemons: true},
        })

        if(!pokedex) return res.status(404).json({message: "Pokedex não encontrada"});

        res.json(pokedex.pokemons);

    }catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar pokedex" });
  }
}

export const delPokemon = async(req: Request, res: Response)=>{
    try{
        const { pokemonId } = req.params;
        await prisma.pokemon.delete({
            where: {id: Number(pokemonId)},
        })
        res.json({message: "Pokemon removido com sucesso!"});

    } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao remover Pokémon" });
  }
}