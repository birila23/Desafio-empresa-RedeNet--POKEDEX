import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '../../../generated/prisma';
import { createUserSchema, } from '../validations/userValidation';
import { parse } from 'path';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) =>{
    try{
        const data = createUserSchema.parse(req.body);
        const { name, email, password } = data;

        const userExists = await prisma.user.findUnique({ where: { email } });
        if(userExists) return res.status(400).json({message: 'Email já cadastrado!'});

        const passwordHash = await bcrypt.hash(password, 10);


        // Cria o usuário
        const user = await prisma.user.create({
        data: {
            name,
            email,
            password: passwordHash,
        },
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    } catch (error: any) {
    // Erros do Zod
    if (error.name === "ZodError") {
      return res.status(400).json({ errors: error.errors });
    }

    console.error(error);
    res.status(500).json({ message: "Erro ao criar usuário" });
  }

}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar usuários" });
  }
};

export const getById = async(req:Request, res:Response) =>{
    try{
    const userId = Number(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json(user);
    }catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar usuário" });
    }
}