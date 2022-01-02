import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "task 1",
      day: "1/1/2022, 10:00am",
      reminder: true,
    },
    {
      id: 2,
      text: "task 2",
      day: "1/2/2022, 2:30pm",
      reminder: true,
    },
  ]);

  const deleteTask = (id) => {
    console.log("delete", id);
  };

  return (
    <div className="container">
      <Header title="Task Tracker" />
      <Tasks tasks={tasks} onDelete={deleteTask} />
    </div>
  );
};

export default App;
