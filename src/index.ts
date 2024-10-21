import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();
app.use(express.json())
const port = 5000;

let whiteList = ['http://localhost:3000']
app.use(cors({
  origin: '*'
}))

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Welcome to Express Typescript Server</h1>');
});

import router from './routers';
app.use(router)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});