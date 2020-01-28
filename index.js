const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

server.use((req, res, next) => {
  console.count('NUmero de requisições');
  return next();
});

function checkProjectExists(req, res, next) {
  const projeto = projects[req.params.index];

  if (!projeto) {
    return res.status(400).json({ error: 'Index not found' });
  }

  return next();
}

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

server.put('/projects/:index', checkProjectExists, (req, res) => {
  const { index } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.index == index);

  project.title = title;

  return res.json(project);
});

server.delete('/projects/:index', checkProjectExists, (req, res) => {
  const { index } = req.params;

  const projectIndex = projects.findIndex(p => p.index == index);

  projects.splice(projectIndex, 1);

  return res.send();
});

server.post('/projects/:index/tasks', checkProjectExists, (req, res) => {
  const { index } = req.params;
  const { tasks } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);
