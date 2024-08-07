import express, { Express, Request, Response } from "express";
import cors from "cors";
import { Pendulum } from "./pendulum";

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
  res.send(pendulum.getUpdatedCoordinates());
});

app.post("/configPendulum", (req: Request, res: Response) => {
  console.log(req.body);
  pendulum = pendulum ? pendulum : new Pendulum(req.body.angularOffset, req.body.mass, req.body.stringLength, req.body.coordinates);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});