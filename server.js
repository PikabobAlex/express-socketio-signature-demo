// import { getCertificate } from "@vitejs/plugin-basic-ssl";
const express = require("express");
// import { createServer as createHttps } from "https";
const { createServer: createHttp } = require("http");
const { Server } = require("socket.io");
// import ViteExpress from "vite-express";

// async function init() {
// console.log(process.env.NODE_ENV);

// if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
//   const certificate = await getCertificate("node_modules/.vite/basic-ssl");
//   server = createHttps(
//     {
//       key: certificate,
//       cert: certificate,
//     },
//     app
//   );
// }

// ViteExpress.config({
//   mode:
//     !process.env.NODE_ENV || process.env.NODE_ENV === "development"
//       ? "development"
//       : "production",
// });
// ViteExpress.bind(app, server);
// }
// init();
const port = process.env.PORT || 3000;
const app = express();
let server = createHttp(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("signature", (msg) => {
    console.log("message: " + msg);
    socket.emit("received");
    io.emit("unity signature", msg);
  });
});

server.listen(port, () => {});
