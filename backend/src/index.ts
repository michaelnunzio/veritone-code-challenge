import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import * as ListController from "./controllers/list_controller";

dotenv.config();

// Middleware
const app = express();
const PORT = 4000;

//MongoDB & Mongoose
mongoose.connect(`${process.env.DB_MONGO_CONNECTION}${process.env.DB_PASSWORD}${process.env.DB_MONGO_CLUSTER}`, { // had to install mongoose @ version 5.13.8
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false // Look into this. Used to clear Deprecation err
}, (err : Error) => {
    if(err) throw err;
    console.log('Connected To Mongo');
});

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }))

app.get('/test', (req: Request, res: Response) => { // Test Route Delete Later
    res.send('Init test route while setting up repo.')
});

// Shopping List Routes
app.get("/items", ListController.allItems); //Fetch all list items
app.post("/createItem", ListController.addItem); //Create new list item
app.patch("/updateItem/:id", ListController.updateItem); //Update specific list item
app.delete("/deleteItem/:id", ListController.deleteItem); //Delete specific list item

app.listen(PORT, () => {
    console.log("Server Started on Port:", PORT);
  });