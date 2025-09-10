import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";
import { createUserSchema, loginSchema} from '../validations/userValidation';
import { parse } from 'path';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) =>{
    try{
        const data = createUserSchema.parse(req.body);

        const userExists = await prisma.user.findUnique({ where: { email: data.email }});

        if(userExists) return res.status(400).json({message: 'Email já cadastrado!'});

        const passwordHash = await bcrypt.hash(data.password, 10);

        // Cria o usuário
        const newUser = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: passwordHash,
            pokedex: { create: {} }
        },
        include: { pokedex: true },
        });

        res.status(201).json({ message: "Usuário criado com sucesso", user: newUser });

    } catch (error: any) {
    // Erros do Zod
    if (error.name === "ZodError") {
      return res.status(400).json({ errors: error.errors });
    }

    console.error(error);
    res.status(500).json({ message: "Erro ao criar usuário" });
  }

}

export const login = async(req: Request, res:Response)=> {
    try{
    const data = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: data.email }});

    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Senha inválida" });
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

    // retorna usuário sem senha
    return res.status(200).json({
      message: "Login realizado com sucesso",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });

}catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar usuário" });
}
}