import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Middleware
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }))

app.get('/test', (req, res) => {
    res.send('Init test route while setting up repo.')
})

app.listen(PORT, () => {
    console.log("Server Started on Port:", PORT);
  });