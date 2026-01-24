import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";


//import { setupGraphQL } from "../../graphql/graphql";
//import { exceptionMiddleware } from "@/infrastructure/http/middlewares/errors.middleware";
import Router from "@/interfaces/http/routes/api.routes";

export class ApiServer {
  constructor(
    private PORT: number,
    private SERVER_DOMAIN: string,
    private app: express.Application,
  ) {
    this.PORT = PORT;
    this.SERVER_DOMAIN = SERVER_DOMAIN;
    this.app = app;

    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }


  getExpressServer(){
    return this.app;
  }

  setupStaticFiles() {
    const staticPath = this.app.get("staticPath");

    this.app.use(express.static(staticPath));
    // Para cualquier otra ruta, enviar el index.html de React
    
  }

  setVars() {
    this.app.set("enviroment", process.env.ENVIROMENT);

    const staticPath = path.resolve(__dirname, "../frontend/dist");

    this.app.set("staticPath", staticPath);
  }

  setupRoutes() {

     const staticPath = this.app.get("staticPath");

    this.app.use("/api", Router);

    this.app.get(/^(?!\/api\/).*/, (req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });
  }

  setGraphQL() {
   // setupGraphQL(this.app);
  }

  setErrorHandler() {
   // this.app.use(exceptionMiddleware);
  }

  init() {
    this.setVars();
    this.setupStaticFiles();
    this.setupRoutes();
   // this.setGraphQL();
   // this.setErrorHandler();
  }

  listen() {
    

    this.app.listen(this.PORT, () => {
      console.log(`Server running at ${this.SERVER_DOMAIN}:${this.PORT}/api`);
    });
  }
}
