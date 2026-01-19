
// import connectDB from "./db/db.js";

// import express from "express";
// import http from "http";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import bodyParser from "body-parser";


// import yargs from "yargs";
// import { hideBin } from "yargs/helpers";

// import initRepo from "./cli/commands/init.js";
// import addRepo from "./cli/commands/add.js";
// import commitChange from "./cli/commands/commit.js";
// import pushRepo from "./cli/commands/push.js";
// import pullRepo from "./cli/commands/pull.js";
// import revertRepo from "./cli/commands/revert.js";

// // socket congiguration
// import { Server } from "socket.io";
// import { Socket } from "dgram";


// // controller imports
// import mainRouter from "./routes/main.router.js";

// const app = express();
// app.use(cors());


// const serverStart = async () => {
//     dotenv.config();

//     app.use(bodyParser.json());
//     app.use(express.json());
//     app.use(cors({ origin: "*" }));

//     const PORT = process.env.PORT || 3000;
//     console.log("server start here");

//     await connectDB();

//     mongoose.connection.once("open", async () => {
//         console.log("CRUD opration are running...");

//     })

//     app.use("/", mainRouter);
    
//     const server = http.createServer(app);
//     const io = new Server(server, {
//         cors: {
//             origin: "*",
//             methods: ["GET", "POST"]
//         }
//     })

//     io.on("connection", (socket) => {
//         console.log("socket running with socket id:", socket.id);

//         io.on("disconnect", () => {
//             console.log("socket disconnected with socket id:", socket.id);

//         })

//     })

//     server.listen(PORT, () => {
//         console.log(`server running PORT: ${PORT}`);
//     })

// }


// yargs(hideBin(process.argv))
//     .command(
//         "start",
//         "start the server",
//         {},
//         serverStart
//     )
//     .command(
//         "init",
//         "initialize a new git repository",
//         {},
//         initRepo
//     )
//     .command(
//         "add <file>",
//         "add a file to the staging area",
//         (yargs) => {
//             yargs.positional("file", {
//                 describe: 'add file ',
//                 type: "string"
//             })
//         }, (yargs) => {
//             addRepo(yargs.file)
//         })

//     .command("commit <message>",
//         "commit changes to the repository",
//         (yargs) => {
//             yargs.positional("message", {
//                 describe: " commit message",
//                 type: "string"
//             })
//         }, (yargs) => {
//             commitChange(yargs.message)
//         }
//     )
//     .command("push", "push changes to remote repository", {}, pushRepo)
//     .command("pull", "pull changes from remote repository", {}, pullRepo)
//     .command("revert<commitID>",
//         "revert to a specific commit",
//         (yargs) => {
//             yargs.positional("commitID", {
//                 describe: "commit ID to revert to",
//                 type: "string"
//             });
//         },
//         revertRepo
//     )


//     .demandCommand(1, "You need at least one command")
//     .help()
//     .parse();






import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import mainRouter from "./routes/main.router.js";
import { Server } from "socket.io";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("socket connected:", socket.id);
});

app.use("/", mainRouter);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
