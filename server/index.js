import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import authRouter from './routers/auth.js';
import userRouter from './routers/user.js';
import mapRouter from './routers/map.js';


const app = express();
dotenv.config()
const PORT = process.env.PORT || 5000 ;

//Middleware
app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}));
app.use(cors({origin: true, credentials: true}));

app.get('/', (req, res) => {
    return res.status(200).json({ message: "Welcome to Englephant" })
});

//Connect to mongoose
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: 'Englephant'})
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log("Something wrong happened!", err);
  });

//Routes
app
.use('/api/auth', authRouter)
.use('/api/user', userRouter)
.use('/api/map', mapRouter)


app.listen(PORT, () => {
  console.log("Server started at PORT ", PORT);
});
