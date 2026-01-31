import express from 'express';
import { loginUser } from '../controller/userLogin.js';
import { registerUser } from '../controller/userRegister.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;

