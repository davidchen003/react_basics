import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState, useEffect } from "react";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // fetch data
  // moving this out of useEffect so others can use it
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 1000000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="container">
      {showAddTask && <AddTask onAdd={addTask} />}
      <Header
        title="Task Tracker"
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No Tasks"
      )}
    </div>
  );
};

export default App;
