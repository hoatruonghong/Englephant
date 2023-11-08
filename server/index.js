import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import authRouter from './routers/auth.js';
import mapRouter from './routers/map.js';
import learnerRouter from './routers/learner.js';
import quizRouter from './routers/quiz.js';
import flashcardRouter from './routers/flashcard.js';
import idiomRouter from './routers/idiom.js';
import lrRouter from './routers/lr.js';
import pronunciationRouter from './routers/pronunciation.js';


const app = express();
dotenv.config()
const PORT = process.env.PORT || 5000 ;
export const TOKEN_LIST = {}
export const TOKEN_BLACKLIST = {}

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
.use('/api/map', mapRouter)
.use('/api/learner', learnerRouter)
.use('/api/quiz', quizRouter)
.use('/api/card', flashcardRouter)
.use('/api/idiom', idiomRouter)
.use('/api/lr', lrRouter)
.use('/api/pronunciation', pronunciationRouter)

app.listen(PORT, () => {
  console.log("Server started at PORT ", PORT);
});
