import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import "reflect-metadata";
import { myDataSource } from "./app-data-source"
import { createDatabase } from 'typeorm-extension';
import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import Router from "./routes";
import dbConfig from "./config/database";
export const app: Application = express();

const PORT = process.env.PORT || 8000;


myDataSource.initialize()
  .then(() => {
    console.log("Connected to db");
    // const app: Application = express();

    app.use(express.json());
    app.use(morgan("tiny"));

    app.use(express.static("public"));
    app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(undefined, {
        swaggerOptions: {
          url: "/swagger.json",
        },
      })
    );

    app.use(Router);
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch(async (err: any) => {
    console.log('ERR:', err)
    if (err.code === 'ER_BAD_DB_ERROR') {

      // Create the database with specification of the DataSource options
      await createDatabase({
        options: dbConfig,
        ifNotExist: true
      });
    }
    console.log("Unable to connect to db", err);
    process.exit(1);
  });
  