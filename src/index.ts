import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
/* import { errorHandler } from "./middlewares/errors.middleware";
import apiRouter from "./routes/routes"; */

import dotenv from "dotenv";
import apiRouter from "./api/routes/routes";
import mongoose from "mongoose";

//dotenv
dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRouter);


import { setupGraphQL } from "./graphql/graphql";
setupGraphQL(app);


import {errorHandler} from "./api/middlewares/errors.middleware";
app.use(errorHandler)

const PORT = process.env.SERVER_PORT || 5000;
// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


import { initializeRoles } from "./scripts/roles";
mongoose
  .connect(process.env.MONGODB_URI ?? "mongodb://localhost:27017/presta")
  .then(() => {
    console.log("Conexión a MongoDB establecida con éxito");

    // Iniciar el servidor
    /* server.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`)
      console.log(`Socket.IO escuchando.`)
      console.log(`Frontend disponible en http://localhost:${PORT}`)
    }) */

      initializeRoles().then(()=>{console.log("reoles creados")}).catch(err => console.error(err));

  })
  .catch((err: any) => {
    console.error("Error al conectar a MongoDB:", err);
    process.exit(1);
  });
