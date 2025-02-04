import express from "express";
import {body} from 'express-validator';
import {registerCaptain, loginCaptain, logoutCaptain, getCaptainProfile} from "../controllers/captain.controller.js";

import  {captainAuthMiddleware} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min: 3}).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min: 3}).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['motorcycle', 'car', 'auto']).withMessage('Vehicle type must be motorcycle, car or auto'),

], registerCaptain);

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')], loginCaptain );

router.get('/logout', captainAuthMiddleware, logoutCaptain);

router.get('/profile', captainAuthMiddleware, getCaptainProfile);


export default router;