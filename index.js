import express from 'express';
import { promises as fs } from 'fs';
import gradesRouter from './routes/grades.js';
import bodyParser from 'body-parser';

const { readFile, writeFile } = fs;
const app = express();
global.fileName = 'grades.json';

// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use('/grades', gradesRouter);
app.listen(34567, async () => {
  console.log('api started');
});

app.use(express.json());
