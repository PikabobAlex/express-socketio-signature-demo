import { getCertificate } from "@vitejs/plugin-basic-ssl";
import express from "express";
import { createServer as createHttps } from "https";
import { createServer as createHttp } from "http";
import { Server } from "socket.io";
import ViteExpress from "vite-express";

async function init() {
  console.log(process.env.NODE_ENV);

  const port: any = process.env.PORT || 3000;
  const app = express();
  let server: any = createHttp(app);
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    const certificate = await getCertificate("node_modules/.vite/basic-ssl");
    server = createHttps(
      {
        key: certificate,
        cert: certificate,
      },
      app
    );
  }
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
  ViteExpress.config({
    mode:
      !process.env.NODE_ENV || process.env.NODE_ENV === "development"
        ? "development"
        : "production",
  });
  ViteExpress.bind(app, server);
}
init();
