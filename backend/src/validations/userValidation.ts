import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string(),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(50),
});

export const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});