import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { tracesRoutes } from "./src/api";

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` })

const app: Express = express();
app.use(express.json());
app.use('/', tracesRoutes)

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
