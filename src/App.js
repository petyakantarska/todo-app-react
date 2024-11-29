// src/App.js
import React, { useState, useEffect } from 'react';
import { db, collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from './firebase';
import { Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from Firestore
  const fetchTasks = async () => {
    const tasksCollection = collection(db, 'tasks');
    const taskSnapshot = await getDocs(tasksCollection);
    const taskList = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTasks(taskList);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleTaskCompletion = async (taskId, completed) => {
    const taskDoc = doc(db, 'tasks', taskId);
    await updateDoc(taskDoc, {
      completed: !completed, // Toggle the completed status
    });
    fetchTasks(); // Refresh tasks list
  };
  
  // Add a new task
  const addTask = async () => {
    if (task.trim()) {
      await addDoc(collection(db, 'tasks'), { task: task, completed: false });
      setTask('');
      fetchTasks(); // Refresh tasks
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    const taskDoc = doc(db, 'tasks', taskId);
    await deleteDoc(taskDoc);
    fetchTasks(); // Refresh tasks
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">To-Do App</h1>
      
      {/* Add Task Form */}
      <Form>
        <Form.Group controlId="taskInput">
          <Form.Control
            type="text"
            placeholder="Enter a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </Form.Group>
        <Button variant="secondary" onClick={addTask} className="w-100 mt-3">
          Add Task
        </Button>
      </Form>

      {/* Task List */}
      <ListGroup className="mt-4">
        {tasks.map((task) => (
          <ListGroupItem key={task.id} className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Form.Check
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id, task.completed)}
                className="mr-4"
              />
              <span
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                }}
              >
                {task.task}
              </span>
            </div>
            <Button variant="danger" onClick={() => deleteTask(task.id)} size="sm">
              Delete
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

export default App;
