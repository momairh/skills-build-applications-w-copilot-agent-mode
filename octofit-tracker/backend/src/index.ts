import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database';
import usersRouter from './routes/users';
import activitiesRouter from './routes/activities';

dotenv.config();

const app = express();
const port = 8000;

// Codespaces exposes forwarded ports on app.github.dev; fall back to localhost otherwise
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API is running', baseUrl });
});

app.use('/api/users', usersRouter);
app.use('/api/activities', activitiesRouter);

app.listen(port, () => {
  console.log(`OctoFit Tracker API running at ${baseUrl}`);
});
