import dotenv from "dotenv";
import express, { Express } from "express";
import { tracesRoutes, statisticsRoutes } from "./src/api";

dotenv.config()

const app: Express = express();
app.use(express.json());

app.use('/traces', tracesRoutes)
app.use('/statistics', statisticsRoutes)

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// export default app;