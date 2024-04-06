import express from "express";
import { PORT, mongoDB_URL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY - custom
app.use(cors());

//Home route
app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome to MERN Stack Tutorial');
});

app.use('/books', booksRoute);



mongoose.connect(mongoDB_URL).then( () => {
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
})
.catch(console.warn)
