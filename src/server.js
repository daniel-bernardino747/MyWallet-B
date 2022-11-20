import express from 'express';
import cors from 'cors';
import routes from './routes/index.routes.js';

const app = express();
const port = 5000;

app.use(cors())
  .use(express.json())
  .use(routes);

app.listen(port, () => {
  console.log(`🌀 started server in door: ${port}`);
});
