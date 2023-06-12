const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.static('public', { "extensions": ["html", "js","css"] }));
const tasksFilePath = 'tasks.txt';

// Read tasks from the file
function readTasksFromFile() {
  try {
    const tasksData = fs.readFileSync(tasksFilePath, 'utf8');
    return JSON.parse(tasksData);
  } catch (error) {
    console.error('Error reading tasks from file:', error);
    return [];
  }
}

// Write tasks to the file
function writeTasksToFile(tasks) {
  try {
    const tasksData = JSON.stringify(tasks, null, 2);
    fs.writeFileSync(tasksFilePath, tasksData, 'utf8');
    console.log('Tasks written to file successfully');
  } catch (error) {
    console.error('Error writing tasks to file:', error);
  }
}

// API endpoint to get all tasks
app.get('/tasks', (req, res) => {
  const tasks = readTasksFromFile();
  res.json(tasks);
});

// API endpoint to add a new task
app.post('/tasks', (req, res) => {
  const tasks = readTasksFromFile();
  const newTask = req.body;
  tasks.push(newTask);
  writeTasksToFile(tasks);
  res.json({ success: true });
});

// API endpoint to update a task
app.put('/tasks/:taskId', (req, res) => {
  const tasks = readTasksFromFile();
  const taskId = req.params.taskId;
  const updatedTask = req.body;

  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex] = updatedTask;
    writeTasksToFile(tasks);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// API endpoint to delete a task
app.delete('/tasks/:taskId', (req, res) => {
  const tasks = readTasksFromFile();
  const taskId = req.params.taskId;

  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    writeTasksToFile(tasks);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});