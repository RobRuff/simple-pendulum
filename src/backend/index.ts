import express, { Express, Request, Response } from "express";
import cors from "cors";
import { Pendulum } from "./pendulum.ts";

const port = 3000;
const app: Express = express();

// Configure for only specific host
app.use(cors());
app.use(express.json());

let pendulum: Pendulum;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/getPendulumCoordinates", (_req: Request, res: Response) => {
  res.send({angle: pendulum.getUpdatedCoordinates()});
});

app.post("/configPendulum", (req: Request, res: Response) => {
  pendulum = new Pendulum(req.body.angularOffset, req.body.mass, req.body.stringLength);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});