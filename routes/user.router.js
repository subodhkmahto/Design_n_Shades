import express from 'express';
import UserController from '../src/module/controllers/user.controller.js';
import { setLastVisit } from '../middleware/cookies.last.visit.js';

const router = express.Router();
const usercontroller = new UserController();

router.get('/register', usercontroller.register);
router.post('/register', usercontroller.register); 

router.get('/logout', setLastVisit, usercontroller.logout);

router.post('/login_you', usercontroller.login_you);
router.get('/login_you', usercontroller.login_you);

router.post('/password-reset', usercontroller.forgot_password);
router.get('/forgot_password', usercontroller.forgot_password);

export default router;
