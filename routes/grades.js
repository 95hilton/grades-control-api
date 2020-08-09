import express from 'express';
import { promises as fs, write } from 'fs';
import { globalAgent } from 'http';
import { stringify } from 'querystring';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

const router = express.Router();
const { readFile, writeFile } = fs;

// 5 - SOMA TOTAL OK
router.get('/getsoma/', async (req, res) => {
  try {
    const aluno = req.body.student;
    const materia = req.body.subject;
    const data = JSON.parse(await readFile(global.fileName));
    const grade = data.grades.filter(
      (grade) => grade.student === aluno && grade.subject === materia
    );

    var sum = grade.reduce(function (previousValue, currentValue) {
      return previousValue + currentValue.value;
    }, 0);
    res.send(` Total: ${sum}`);

    res.end();
  } catch (error) {
    console.log(error);
    res.end();
  }
});

// 6- MEDIA OK
router.get('/getmedia/', async (req, res) => {
  try {
    const tipo = req.body.type;
    const materia = req.body.subject;
    const data = JSON.parse(await readFile(global.fileName));
    let grade = data.grades.filter(
      (grade) => grade.type == tipo && grade.subject == materia
    );
    let sum = grade.reduce(function (previousValue, currentValue) {
      return previousValue + currentValue.value;
    }, 0);
    let media = sum / grade.length;
    res.send(` Média: ${media}`);

    res.end();
  } catch (error) {
    console.log(error);
    res.end();
  }
});

// 7 - TOP 3 OK
router.get('/top3/', async (req, res) => {
  try {
    const tipo = req.body.type;
    const materia = req.body.subject;
    const data = JSON.parse(await readFile(global.fileName));
    const grade = data.grades.filter(
      (grade) => grade.type == tipo && grade.subject == materia
    );
    // ordena
    grade.sort((a, b) => {
      return b.value - a.value;
    });

    res.send(grade.slice(0, 3));

    res.end();
  } catch (error) {
    console.log(error);
    res.end();
  }
});

// 1 - CRIAR GRADE
router.post('/', async (req, res) => {
  try {
    let insert = req.body;
    const data = JSON.parse(await readFile(global.fileName));
    let grade = {
      id: data.nextId,
      student: insert.student,
      subject: insert.subject,
      type: insert.type,
      value: parseInt(insert.value),
    };

    data.nextId = data.nextId + 1;
    data.grades.push(grade);
    await writeFile(global.fileName, JSON.stringify(data));
    res.send('objeto criado');
    res.status(201);
    res.end();
  } catch (error) {
    console.log(error);
    res.end();
  }
});

// 2 - ATUALIZAR
router.patch('/:id', async (req, res) => {
  const body = req.body;
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.grades.findIndex(
      (grade) => grade.id === parseInt(req.params.id)
    );

    data.grades[index].subject = body.subject;
    data.grades[index].type = body.type;
    data.grades[index].value = parseInt(body.value);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(data.grades[index]);
    res.end();
  } catch (error) {
    console.log(error);
    res.end();
  }
});

// 3 - EXCLUIR OK
router.delete('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const grade = data.grades.filter(
      (grade) => grade.id !== parseInt(req.params.id)
    );

    let temp = {
      nextId: data.nextId++,
      grades: grade,
    };
    await writeFile(global.fileName, JSON.stringify(temp, null, 2));
    res.end();
  } catch (error) {
    console.log(error);
    res.end();
  }
});

// 4- CONSULTA OK
router.get('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const grade = data.grades.find((grade) => grade.id == req.params.id);
    res.send(grade);
  } catch (error) {
    console.log(error);
    res.end();
  }
});

export default router;
