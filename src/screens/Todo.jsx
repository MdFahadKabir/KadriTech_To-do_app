import React, { useState, useEffect } from "react";
import TaskComponent from "../components/TaskComponent";
import AddTaskButton from "../components/AddTaskButton";
import ClockTime from "../components/ClockTime";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import abstact from "../assets/abstract.png";

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

  useEffect(() => {
    const checkOverdueTasks = () => {
      const now = new Date();
      tasks.forEach((task) => {
        if (
          task.status === "Ongoing" &&
          task.datetime &&
          new Date(task.datetime) < now &&
          (!task.lastWarningShown ||
            new Date(task.lastWarningShown).getTime() + 60000 <= now.getTime())
        ) {
          toast.warning(`This task "${task.title}" is overdue!`);
          setTasks((prevTasks) =>
            prevTasks.map((t) =>
              t.id === task.id
                ? {
                    ...t,
                    lastWarningShown: now.getTime(),
                  }
                : t
            )
          );
        }
      });
    };

    const interval = setInterval(checkOverdueTasks, 60000);
    return () => clearInterval(interval);
  }, [tasks]);

  const addTask = (task) => {
    setTasks([task, ...tasks]);
    toast.success(`Task "${task.title}" added!`);
  };

  const moveTask = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status: newStatus,
            lastWarningShown: null,
          }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <>
      <div className="md:h-screen lg::h-screen xl::h-screen my-auto flex justify-center items-center md:w-screen lg::w-screen xl::w-screen mx-5 md:mx-0 lg:mx-0 xl:mx-0 py-5 md:py-0 lg:py-0 xl:py-0">
        <div className="flex flex-col">
          <ClockTime />
          <p className="text-center py-5 text-lg md:text-xl lg:text-2xl xl:text-2xl font-bold underline">
            Todo App
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-10 ">
            <div className="w-full border  border-gray_light shadow-md p-6 rounded-md bg-gray_light">
              <h2 className="text-lg font-bold mb-4">New Task </h2>
              <TaskComponent
                tasks={tasks.filter((task) => task.status === "New")}
                moveTask={moveTask}
                taskType="New"
                searchPlaceholder="Search New task"
              />
              <AddTaskButton addTask={addTask} />
            </div>
            <div className="w-full border  border-gray_light shadow-md p-6 rounded-md bg-gray_light">
              <h2 className="text-lg font-bold mb-4">OnGoing Task </h2>
              <TaskComponent
                tasks={tasks.filter((task) => task.status === "Ongoing")}
                moveTask={moveTask}
                taskType="Ongoing"
                searchPlaceholder="Search Ongoing task"
              />
            </div>
            <div className="w-full border  border-gray_light shadow-md p-6 rounded-md bg-gray_light">
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
      </div>
      <ToastContainer />
    </>
  );
};

export default Todo;
