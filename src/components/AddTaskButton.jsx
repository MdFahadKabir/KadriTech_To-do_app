import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "./Modal";

const AddTaskButton = ({ addTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, onChange] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    const currentDate = new Date();
    const id = `${currentDate.getFullYear()}${
      currentDate.getMonth() + 1
    }${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}${currentDate.getMilliseconds()}`;

    const newTask = {
      id: id,
      title: title,
      description: description,
      status: "New",
    };

    // Log the new task data
    console.log("New Task Submitted:", newTask);

    // Add the new task to the list
    addTask(newTask);

    // Clear input fields and close the modal
    setTitle("");
    setDescription("");
    handleCloseModal();
  };

  return (
    <div className="mt-5">
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 p-2 bg-blue text-white rounded flex flex-row hover:bg-blue/50 duration-700"
      >
        <FaPlus className="my-auto" size={10} />
        <p className="text-sm px-2">Add Task</p>
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="flex flex-col">
          <input
            type="text"
            className="border-2 border-blue rounded-md py-2 px-5 mb-3 outline-none "
            placeholder="Input task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="border-2 border-blue rounded-md py-2 px-5 mb-3 outline-none"
            placeholder="Input task description"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="bg-blue text-white border-0 rounded-md w-full text-center text-sm font-semibold py-2 cursor-pointer hover:bg-blue/50 duration-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddTaskButton;
