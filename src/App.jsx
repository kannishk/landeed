function App() {
  return (
    <div>
      <Timer />
      <Clock />
    </div>
  );
}

export function Timer() {
  return (
    <div>
      <h1>Timer</h1>
      <input type="number" placeholder="Hours"></input>
      <input type="number" placeholder="Minutes"></input>
      <input type="number" placeholder="Seconds"></input>
      <button
        onClick={() => {
          startTimer;
        }}
      >
        Start the Timer
      </button>
    </div>
  );
}
export function Clock() {
  return (
    <div>
      <h2>World Clock</h2>
      <i>Select a Time Zone</i>
      <button onClick={istTime}>IST</button>
      <button onClick={pstTime}>PST</button>
      <br />
      <div>Displaying the Clock</div>
    </div>
  );
}

async function countDown(hours, minutes, seconds) {
  if (seconds >= 60) {
    minutes += seconds / 60;
    seconds = seconds % 60;
  }
  if (minutes >= 60) {
    hours += minutes / 60;
    minutes = minutes % 60;
  }
  await setInterval(function () {
    //display time
    if (hours == 0 && minutes == 0 && seconds == 0) {
      return;
    }
    if (seconds == 0) {
      minutes--;
      if (minutes == 0) {
        hours--;
        minutes = 59;
        seconds = 50;
      }
      seconds = 59;
    }
    seconds--;
  }, 1000);
}

async function pstTime() {
  //   const data = await axios.get("http://worldtimeapi.org/api/timezone/PST8PDT");
  //   const time = data.response.time;
  //   console.log(time);
}
async function istTime() {
  //   const data = await axios.get("http://worldtimeapi.org/api/timezone/PST8PDT");
  //   const time = data.response.time;
  //   console.log(time);
}

// function clock() {
//   const [zone, setZone] = useState(["IST", "PST"]);
// }

export default App;
