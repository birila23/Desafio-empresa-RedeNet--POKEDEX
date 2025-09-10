import { Router } from 'express';
import { createUser, login } from '../controller/controllerUser';
import { authenticate } from '../middleware/authenticate';

const routerUser = Router();

routerUser.post('/cadastrarUsuario', createUser);
routerUser.post('/login', login);

export default routerUser;