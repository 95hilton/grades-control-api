import express from 'express';
import { promises as fs, write } from 'fs';
import { globalAgent } from 'http';

const router = express.Router();
const { readFile, writeFile } = fs;

// 1 - CRIAR GRADE
router.post('/', async (req, res) => {
  try {
    let insert = req.body;
    console.log(insert);
    const data = JSON.parse(await readFile(global.fileName));
    // let temp = {
    //   nextId: data.nextId++,
    //   grades: {
    //     student: insert.student,
    //     subject: insert.subject,
    //     type: insert.type,
    //     value: insert.value,
    //   },
    // };
    //data.push(insert);
    //console.log(temp);
    res.send(insert);
    res.status(201);
    res.end();
  } catch (error) {
    console.log(error);
    res.end();
  }
});

router.put('/:id', async (req, res) => {
  try {
    let update = req.body;

    console.log(update);

    const data = JSON.parse(await readFile(global.fileName));
    const grade = data.grades.filter((grade) => grade.id == req.params.id);
    grade.student = update.student;
    grade.subject = update.subject;
    grade.type = update.type;
    grade.value = update.value;

    let temp = {
      nextId: data.nextId++,
      grades: grade,
    };

    //await writeFile(global.fileName, JSON.stringify(grade, null, 2));
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
    // console.log(req.params.id);
    //console.log(grade);

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

// 5 - SOMA TOTAL
router.get('/totalBySubjct', async (req, res) => {
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
export default router;
