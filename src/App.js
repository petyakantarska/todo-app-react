import React, { useState, useEffect } from 'react';
import { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from './firebase';

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

  // Add task to Firestore
  const addTask = async () => {
    if (task.trim()) {
      await addDoc(collection(db, 'tasks'), { task: task, completed: false });
      setTask('');
      fetchTasks();
    }
  };

  // Toggle task completion status
  const toggleTaskCompletion = async (taskId, completed) => {
    const taskDoc = doc(db, 'tasks', taskId);
    await updateDoc(taskDoc, { completed: !completed });
    fetchTasks();
  };

  // Delete task from Firestore
  const deleteTask = async (taskId) => {
    const taskDoc = doc(db, 'tasks', taskId);
    await deleteDoc(taskDoc);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className='h-screen w-screen bg-gray-100 p-5'>
    <div className="flex flex-col justify-center items-center w-1/2 mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-5">To-Do App</h1>
      
      {/* Add Task Form */}
      <div className="w-full bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
        />
        <button
          onClick={addTask}
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
        <div className="space-y-2 w-full">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-3">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id, task.completed)}
                  className="h-5 w-5 border-gray-300 rounded"
                />
                <span
                  className={`text-lg ${task.completed ? 'line-through text-gray-400' : ''}`}
                >
                  {task.task}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="ml-4 p-2 text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
    </div>
    </div>
  );
}

export default App;
