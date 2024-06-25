import React, { useState, useEffect } from "react";
import TaskListComponent from "./TaskListComponent";
import SearchComponent from "./SearchComponent";

const TaskComponent = ({ tasks, moveTask, taskType, isOpenModal }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase()); // Convert search term to lowercase for case-insensitive search
  };

  // Function to filter tasks based on taskType and searchTerm
  const filterTasks = () => {
    return tasks.filter((task) => {
      return (
        task.status === taskType &&
        task.title.toLowerCase().includes(searchTerm)
      );
    });
  };

  // Update filteredTasks whenever searchTerm or tasks change
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredTasks([]);
    } else {
      setFilteredTasks(filterTasks());
    }
  }, [searchTerm, tasks, taskType]);

  return (
    <div className="w-[300px] h-[300px] overflow-auto scrollbar-hide">
      <SearchComponent
        id={`search-${taskType.toLowerCase()}`}
        placeholder={`Search ${taskType} task`}
        handleSearch={handleSearch}
      />
      {filteredTasks.length > 0
        ? filteredTasks.map((task) => (
            <div key={task.id}>
              <TaskListComponent
                task={task}
                moveTask={moveTask}
                isOpenModal={isOpenModal}
              />
            </div>
          ))
        : tasks
            .filter((task) => task.status === taskType)
            .map((task) => (
              <div key={task.id}>
                <TaskListComponent
                  task={task}
                  moveTask={moveTask}
                  isOpenModal={isOpenModal}
                />
              </div>
            ))}
    </div>
  );
};

export default TaskComponent;
