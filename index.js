import express from 'express';
import { promises as fs } from 'fs';
import gradesRouter from './routes/grades.js';
const { readFile, writeFile } = fs;
const app = express();
global.fileName = 'grades.json';

app.use('/grades', gradesRouter);
app.listen(34567, async () => {
  console.log('api started');
});

app.use(express.json());
