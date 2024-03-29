import { useEffect, useState } from "react";
import axios from "axios";
// import cors from "cors";

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Timer />
      <Clock />
    </div>
  );
}

export function Timer() {
  const [timers, setTimers] = useState([]); //List
  const [newTimer, setNewTimer] = useState(""); //current one
  const [countdowns, setCountdowns] = useState([]);

  function handleChange(e) {
    setNewTimer(e.target.value);
  }

  function startTimer() {
    const timerValue = parseInt(newTimer, 10);
    if (!isNaN(timerValue) && timerValue > 0) {
      setTimers([...timers, timerValue]);
      setCountdowns([...countdowns, timerValue]);
      setNewTimer("");
    }
  }

  //mysoln
  // function removeTimer(index) {
  //   const updatedTimers = [...timers];
  //   updatedTimers.splice(index, 1);
  //   setTimers(updatedTimers);
  // }

  //Suggested
  function removeTimer(index) {
    const updatedTimers = timers.filter((_, i) => i !== index);
    const updatedCountdowns = countdowns.filter((_, i) => i !== index);
    setCountdowns(updatedCountdowns);
    setTimers(updatedTimers);
  }

  useEffect(() => {
    const intervalIds = timers.map((timer, index) => {
      return setInterval(() => {
        setCountdowns((previousCountdowns) => {
          const newCountdowns = [...previousCountdowns];
          newCountdowns[index] =
            newCountdowns[index] > 0 ? newCountdowns[index] - 1 : 0;
          // console.log(newCountdowns);
          return newCountdowns;
        });
        // console.log(timers);
        // console.log(countdowns);
      }, 1000);
    });

    return () => {
      intervalIds.forEach((intervalId) => clearInterval(intervalId));
    };
  }, [timers]);

  return (
    <div>
      <h1>Timer</h1>
      <input
        type="number"
        value={newTimer}
        onChange={handleChange}
        placeholder="Seconds"
      ></input>
      {/* <input type="number" placeholder="Minutes"></input>
      <input type="number" placeholder="Seconds"></input> */}
      <button onClick={startTimer}>Start the Timer</button>
      <ul>
        {/* {useEffect(() => { */}
        {timers.map((timer, index) => (
          <li key={index}>
            Timer {index + 1}: {countdowns[index]} seconds
            <button onClick={() => removeTimer(index)}>Remove</button>
          </li>
        ))}
        {/* }, [countdowns])} */}
      </ul>
    </div>
  );
}

// async function countDown(hours, minutes, seconds) {
//   if (seconds >= 60) {
//     minutes += seconds / 60;
//     seconds = seconds % 60;
//   }
//   if (minutes >= 60) {
//     hours += minutes / 60;
//     minutes = minutes % 60;
//   }
//   setInterval(function () {
//     //display time
//     if (hours == 0 && minutes == 0 && seconds == 0) {
//       return;
//     }
//     if (seconds == 0) {
//       minutes--;
//       if (minutes == 0) {
//         hours--;
//         if (hours == 0 && minutes == 0 && seconds == 0) {
//           return;
//         }
//         minutes = 59;
//       }
//       seconds = 59;
//     }
//     seconds--;
//   }, 1000);
// }

export function Clock() {
  const [selectedTimeZone, setSelectedTimeZone] = useState("Asia/Kolkata");
  const [time, setTime] = useState("");

  useEffect(() => {
    let intervalId;
    async function findTime() {
      try {
        const response = await axios.get(
          `https://api.timezonedb.com/v2.1/get-time-zone?key=I1D9WHY762ZI&format=json&by=zone&zone=${selectedTimeZone}`
        );
        const fetchTime = await new Date(response.data.formatted);
        setTime(
          fetchTime.toLocaleTimeString().split(":").slice(0, 2).join(":")
        );
      } catch (error) {
        console.error(error);
      }
    }
    findTime();
    intervalId = setInterval(() => {
      findTime();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [selectedTimeZone]);

  return (
    <div>
      <h2>World Clock</h2>
      <i>Select a Time Zone: </i>
      <select
        value={selectedTimeZone}
        onChange={(e) => setSelectedTimeZone(e.target.value)}
      >
        <option value="America/Los_Angeles">PST</option>
        <option value="Asia/Kolkata">IST</option>
      </select>
      <h3>Time: {time}</h3>
    </div>
  );
}

export default App;
