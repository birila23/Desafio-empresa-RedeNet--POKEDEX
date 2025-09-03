import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './router/userRouter'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", userRouter);
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})