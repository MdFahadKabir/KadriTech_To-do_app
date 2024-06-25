import React, { useState, useEffect } from "react";
import TaskComponent from "../components/TaskComponent";
import AddTaskButton from "../components/AddTaskButton";

const Todo = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([task, ...tasks]);
  };

  const moveTask = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="border h-screen my-auto flex justify-center items-center w-screen">
      <div className="flex justify-between">
        <div className="w-1/3 border mx-2 p-6 rounded-md bg-gray-light">
          <h2 className="text-lg font-bold mb-4">New Task </h2>
          <TaskComponent
            tasks={tasks.filter((task) => task.status === "New")}
            moveTask={moveTask}
            taskType="New"
            searchPlaceholder="Search New task"
          />
          <AddTaskButton addTask={addTask} />
        </div>
        <div className="w-1/3 border mx-2 p-6 rounded-md bg-gray-light">
          <h2 className="text-lg font-bold mb-4">OnGoing Task </h2>
          <TaskComponent
            tasks={tasks.filter((task) => task.status === "Ongoing")}
            moveTask={moveTask}
            taskType="Ongoing"
            searchPlaceholder="Search Ongoing task"
          />
        </div>
        <div className="w-1/3 border mx-2 p-6 rounded-md bg-gray-light">
          <h2 className="text-lg font-bold mb-4">Completed Task </h2>
          <TaskComponent
            tasks={tasks.filter((task) => task.status === "Done")}
            moveTask={moveTask}
            taskType="Done"
            searchPlaceholder="Search Completed task"
          />
        </div>
      </div>
    </div>
  );
};

export default Todo;
