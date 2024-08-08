import express, { Express, Request, Response } from "express";
import cors from "cors";
import { Pendulum } from "./pendulum.ts";

const port = process.env.PORT || 3000;
const app: Express = express();

app.use(cors());
app.use(express.json());

let pendulum: Pendulum;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/getPendulumAngle", (_req: Request, res: Response) => {
  res.send({angle: pendulum.getUpdatedAngle()});
});

app.post("/configPendulum", (req: Request, res: Response) => {
  pendulum = new Pendulum(req.body.angularOffset, req.body.mass, req.body.stringLength);
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});