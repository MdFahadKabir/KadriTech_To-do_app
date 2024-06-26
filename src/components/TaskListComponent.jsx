import React, { useState, useRef, useEffect } from "react";
import { BsTextParagraph, BsHash, BsThreeDotsVertical } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import Modal from "./Modal";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskListComponent = ({ task, moveTask }) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dateTime, setDateTime] = useState(new Date(task.datetime));
  const [remainingTime, setRemainingTime] = useState("");
  const [isOverdue, setIsOverdue] = useState(false);
  const [lastWarningShown, setLastWarningShown] = useState(
    task.lastWarningShown || null
  );
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

  useEffect(() => {
    const interval = setInterval(() => {
      updateRemainingTime();
    }, 1000);
    return () => clearInterval(interval);
  }, [task.datetime]);

  const updateRemainingTime = () => {
    const now = new Date();
    const deadline = new Date(task.datetime);

    if (task.status === "Ongoing" && deadline > now) {
      const timeDiff = deadline - now;
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s left`);
      setIsOverdue(false);
    } else if (task.status === "Ongoing" && deadline <= now) {
      setIsOverdue(true);
      setRemainingTime("");
      if (!lastWarningShown || now - new Date(lastWarningShown) > 60000) {
        toast.warn(`Task "${task.title}" is overdue!`);
        setLastWarningShown(now);
        task.lastWarningShown = now;
      }
    } else {
      setRemainingTime("");
      setIsOverdue(false);
    }
  };

  const handleMoveTask = (newStatus) => {
    moveTask(task.id, newStatus);
    setIsOpenDropdown(false);
  };

  const openUpdateModal = () => {
    setIsOpenModal(true);
    setDateTime(task.datetime ? new Date(task.datetime) : new Date());
    setIsOpenDropdown(false);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setDateTime(new Date());
  };

  const updateTaskDateTime = () => {
    task.datetime = dateTime;
    updateRemainingTime();
    toast.success(`Deadline for "${task.title}" updated!`);
    closeModal();
  };

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

  return (
    <>
      <div className="border-0 p-3 rounded-md bg-white mt-5 shadow-md ">
        <div>
          <div className="flex justify-between">
            <p>{task.title}</p>
            <div className="relative " ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="p-2  rounded-full hover:bg-gray-300 cursor-pointer"
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
              <p className="text-sm">{task.id}</p>
            </div>
          </div>

          {task.status === "Ongoing" && (
            <>
              <div className="flex justify-end">
                <div className="text-white bg-red-500 text-sm mt-2 text-end   inline-block rounded-md p-2">
                  {!task.datetime ? (
                    <p>Please update deadline!</p>
                  ) : isOverdue ? (
                    <p>This task is overdue!</p>
                  ) : (
                    <p>{remainingTime}</p>
                  )}
                </div>
              </div>
            </>
          )}

          {task.status === "Ongoing" && (
            <button
              className="bg-blue text-white border-0 rounded-md w-full text-center text-sm font-semibold py-2 cursor-pointer mt-4 hover:bg-blue/50 duration-700"
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
      </div>
    </>
  );
};

export default TaskListComponent;
