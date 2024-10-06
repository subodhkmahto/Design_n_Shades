import express from 'express';
import ContactController from '../src/module/controllers/contact.controller.js';

const router = express.Router();

const contacts = new ContactController();

router.get('/contact', contacts.contactUser);

router.post('/contact', contacts.contactUser);


export default router;