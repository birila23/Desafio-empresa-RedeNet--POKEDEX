import { Router } from 'express';
import { createUser, getUsers, getUserById } from '../controller/controllerUser';

const routerUser = Router();

routerUser.post('/cadastrarUsuario', createUser);
//routerUser.post('/login', login);
routerUser.get("/usuarios", getUsers);
routerUser.get("/usuario/:id", getUserById);

export default routerUser;