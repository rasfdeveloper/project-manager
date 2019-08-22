const express = require("express");

const app = express();

app.use(express.json());

let numberOfCalls = 0;
const projects = [
  {
    id: "1",
    title: "Primeiro projeto",
    tasks: ["Tarefa 1"]
  }
];

function logCalls(req, res, next) {
  numberOfCalls++;

  console.log(`Número de chamadas: ${numberOfCalls}`);

  next();
}

app.use(logCalls);

function checkProject(req, res, next){
  const project = projects.find(p => p.id == req.params.id);
  if(!project){
    res.status(400).json({error: 'Project does not exists'});
    return;
  }

  next();
}

app.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body;

  projects.push({id, title, tasks});
  res.json(projects);

});

app.get('/projects', (req, res) => {
  res.json(projects);
});

app.put('/projects/:id', checkProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  
  const project = projects.find(p => p.id == id);
  project.title = title;

  res.json(projects);

});

app.delete('/projects/:id', checkProject, (req, res)=> {
  const { id } = req.params;

  const index = projects.findIndex(p => p.id == id);
  projects.splice(index, 1);

  res.json(projects);

});

app.post('/projects/:id/task', checkProject, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  project.tasks.push(title);

  res.json(projects);

});

app.listen(3000, () => {
  console.log('Server on')
})
