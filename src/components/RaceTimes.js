import { useState, useEffect } from "react";

function RaceTimes({ hours, minutes, seconds, milliseconds, isTimerRunning }) {
  const [times, setTimes] = useState([]);

  function clearLastTime() {
    setTimes(times.slice(0, times.length - 1));
  }

  function clearAllTimes() {
    setTimes([]);
  }

  useEffect(() => {
    if (hours === 0 && minutes === 0 && seconds === 0 && milliseconds === 0) {
      setTimes([]);
    }
  }, [hours, minutes, seconds, milliseconds]);
  
  function recordTime() {
    if (isTimerRunning) {
      const insertAt = times.length; // Could be any index
      const currentTime = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
      const nextTimes = [
        // Items before the insertion point:
        ...times.slice(0, insertAt),
        // New item:
        currentTime,
        // Items after the insertion point:
        ...times.slice(insertAt),
      ];
      setTimes(nextTimes);
    }
  }
  return (
    <>
      <>
        <button onClick={recordTime}>Record</button><button onClick={clearLastTime}>Clear last time</button><button onClick={clearAllTimes}>Clear all times</button>
      </>
      <h2>Times</h2>
      <div>
        {times.map((record, recordIndex) => {
          return (
            <div key={recordIndex}>
              <b>{recordIndex + 1}: </b>
              {record}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default RaceTimes;
