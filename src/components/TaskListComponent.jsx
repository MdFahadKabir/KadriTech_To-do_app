import React, { useState, useRef, useEffect } from "react";
import { BsTextParagraph, BsHash, BsThreeDotsVertical } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import Modal from "./Modal";

import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
const TaskListComponent = ({ task, moveTask }) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [isOverdue, setIsOverdue] = useState(false); // State to track overdue status
  const dropdownRef = useRef(null);
  const modalRef = useRef(null);

  const toggleDropdown = () => setIsOpenDropdown(!isOpenDropdown);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpenDropdown(false);
    }
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpenModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Effect to check overdue status when dateTime or task.status changes
  useEffect(() => {
    const now = new Date();
    if (
      task.status === "Ongoing" &&
      task.datetime &&
      new Date(task.datetime) < now
    ) {
      setIsOverdue(true);
    } else {
      setIsOverdue(false);
    }
  }, [task.datetime, task.status]);

  const handleMoveTask = (newStatus) => {
    moveTask(task.id, newStatus);
    setIsOpenDropdown(false);
  };

  const openUpdateModal = () => {
    setIsOpenModal(true);
    setDateTime(task.datetime ? new Date(task.datetime) : new Date());
    setIsOpenDropdown(false); // Close dropdown when opening modal
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setDateTime(new Date()); // Reset DateTimePicker
  };

  const updateTaskDateTime = () => {
    // Update task date/time logic goes here
    console.log("Updated Date/Time:", dateTime);

    // Example validation for overdue task
    const now = new Date();
    if (task.status === "Ongoing" && task.datetime && task.datetime < now) {
      setIsOverdue(true); // Set overdue state
      alert("This task is overdue!"); // Display alert (optional)
    } else {
      setIsOverdue(false);
    }

    closeModal(); // Close modal after updating
  };

  return (
    <div className="border p-3 rounded-md bg-white mt-5">
      <div className="flex justify-between">
        <p>{task.title}</p>
        <div className="relative " ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 cursor-pointer"
          >
            <BsThreeDotsVertical />
          </button>
          {isOpenDropdown && (
            <div className="absolute right-0 mt-2 w-auto bg-white border-0 rounded-md shadow-lg z-10">
              {task.status !== "New" && (
                <p
                  className="block px-4 py-2 text-sm font-semibold text-white hover:bg-blue/50 bg-blue cursor-pointer"
                  onClick={() => handleMoveTask("New")}
                >
                  Move to New
                </p>
              )}
              {task.status !== "Ongoing" && (
                <p
                  className="block px-4 py-2 text-sm font-semibold text-white hover:bg-orange/50 bg-orange cursor-pointer"
                  onClick={() => handleMoveTask("Ongoing")}
                >
                  Move to Ongoing
                </p>
              )}
              {task.status !== "Done" && (
                <p
                  className="block px-4 py-2 text-sm font-semibold text-white hover:bg-green/50 bg-green cursor-pointer"
                  onClick={() => handleMoveTask("Done")}
                >
                  Move to Done
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row pt-3">
        <BsTextParagraph className="my-auto" size={16} />
        <div className="flex flex-row mx-2">
          <GrAttachment className="my-auto" size={16} />
          <p className="text-sm">3</p>
        </div>
        <div className="flex flex-row">
          <BsHash className="my-auto" size={16} />
          {/* Dynamic ID */}
          <p className="text-sm">{task.id}</p>
        </div>
      </div>
      {isOverdue && (
        <p className="text-red-500 text-sm mt-2">This task is overdue!</p>
      )}
      {task.status === "Ongoing" && (
        <button
          className="bg-blue text-white border-0 rounded-md w-full text-center text-sm font-semibold py-2 cursor-pointer mt-4"
          onClick={openUpdateModal}
        >
          Update Date
        </button>
      )}
      <Modal isOpen={isOpenModal} onClose={closeModal} modalRef={modalRef}>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold mb-4">{task.title}</h2>
          <p className="mb-4">{task.description}</p>
          <DateTimePicker
            onChange={setDateTime}
            value={dateTime}
            disableClock={true}
            clearIcon={null}
          />
          <button
            className="bg-blue text-white border-0 rounded-md w-full text-center text-sm font-semibold py-2 cursor-pointer mt-4"
            onClick={updateTaskDateTime}
          >
            Update
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TaskListComponent;
