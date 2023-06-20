import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from "dotenv";


const app = express();
dotenv.config()
const PORT = process.env.PORT || 5000 ;

//Middleware
app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}));
app.use(cors());

app.get('/', (req, res) => {
    return res.status(200).json({ message: "Welcome to Englephant" })
});

//Routes
// const userRouter = require("./routes/User");
// app.use("/user", userRouter);

//Connect to mongoose
mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to mongodb atlas");
  })
  .catch((err) => {
    console.log("Something wrong happened!", err);
  });
app.listen(PORT, () => {
  console.log("Server started at PORT ", PORT);
});
