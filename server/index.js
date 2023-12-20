import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routers/auth.js";
import mapRouter from "./routers/map.js";
import learnerRouter from "./routers/learner.js";
import quizRouter from "./routers/quiz.js";
import flashcardRouter from "./routers/flashcard.js";
import idiomRouter from "./routers/idiom.js";
import lrRouter from "./routers/lr.js";
import pronunciationRouter from "./routers/pronunciation.js";
import talkroomRouter from "./routers/talkroom.js";
import exchangeRouter from "./routers/exchange.js";
import tutorManageRouter from "./routers/admin/tutor.js";
import exchangetableManageRouter from "./routers/admin/exchange.js";
import tutorAccountRouter from "./routers/tutor/account.js";
import tutorWorkshiftRouter from "./routers/tutor/workshift.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
// export const TOKEN_LIST = {};
// export const TOKEN_BLACKLIST = {};

//Middleware
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors({ origin: true, credentials: true }));

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to Englephant" });
});

//Connect to mongoose
mongoose
  .connect('mongodb+srv://hoa:Rc0Y3bSpoyaEkqrn@cluster0.mm7ujky.mongodb.net/?retryWrites=true&w=majority', {
    dbName: "Englephant",
  })
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log("Something wrong happened!", err);
  });

//Routes
app
  .use("/api/auth", authRouter)
  .use("/api/map", mapRouter)
  .use("/api/learner", learnerRouter)
  .use("/api/quiz", quizRouter)
  .use("/api/card", flashcardRouter)
  .use("/api/idiom", idiomRouter)
  .use("/api/lr", lrRouter)
  .use("/api/pronunciation", pronunciationRouter)
  .use("/api/talkroom", talkroomRouter)
  .use("/api/exchangetable", exchangeRouter)

  //admin routes
  .use("/api/admin/tutor", tutorManageRouter)
  .use("/api/admin/exchangetable", exchangetableManageRouter)

  //tutor routes
  .use("/api/tutor/account", tutorAccountRouter)
  .use("/api/tutor/workshift", tutorWorkshiftRouter);

//Socket.io
import { Server } from 'socket.io';
import { roomHandler } from "./room/index.js";

import { createServer } from "http";
const server = createServer(app)

// const io = new Server(process.env.SOCKET_PORT, {
//   cors: {
//     origin: '*',
//     methods: ["GET", "POST"],
//   }
// })
const io = new Server(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
})

// io.on("connection", (socket) => {
//   console.log("user is connected");
  
//   roomHandler(socket);

//   socket.on('disconnect', () => {
//     console.log("user is disconnected");
//   });
// });

io.on("connection", (socket) => {
  socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})

});

server.listen(PORT, () => {
  console.log("Server started at PORT ", PORT);
});
server.timeout = 5 * 1000;
export default app;
