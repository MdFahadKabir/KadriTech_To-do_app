// ./src/components/Clock.jsx
import React, { useState, useEffect } from "react";

const ClockTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const day = time.toLocaleDateString("en-US", { weekday: "long" });
  const date = time.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hourDegrees = (hours % 12) * 30 + minutes * 0.5;
  const minuteDegrees = minutes * 6;
  const secondDegrees = seconds * 6;
  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <div>
          <div className="relative">
            {" "}
            <div className="clock absolute  -right-10   ">
              <div
                className="hour-hand"
                style={{ transform: `rotate(${hourDegrees}deg)` }}
              ></div>
              <div
                className="minute-hand"
                style={{ transform: `rotate(${minuteDegrees}deg)` }}
              ></div>
              <div
                className="second-hand"
                style={{ transform: `rotate(${secondDegrees}deg)` }}
              ></div>
            </div>
          </div>
        </div>

        {/* add local degital time  like wednesday, June 26, 2024 || Hour:min:seconds */}
        <h1 className="mt-28 text-lg md:text-xl lg:text-2xl xl:text-2xl font-bold text-gray-800 border-4">
          {day}, {date} || {hours.toString().padStart(2, "0")}:
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </h1>
      </div>
    </>
  );
};

export default ClockTime;
