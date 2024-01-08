import Head from 'next/head';
import { useState, useEffect } from 'react';
import RaceTimes from '../components/RaceTimes';
import {supabase} from "../../api";
import styles from './race-recorder.module.css';

function RaceRecorder() {
  const [currentTime, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  function startAndStop() {
    setIsTimerRunning(!isTimerRunning);
  }
  
  async function test() {
   const {data, error} = await supabase.from('XCountryAdmin').select();
   console.log(JSON.stringify(data));
   if (error) {
     console.log(error);
   }
  }

  const resetWarningElement = (
    <div>
      <h2>Are you sure you want to reset</h2>
      <p>This will reset the timer and the results.</p>
      <button onClick={() => {setTime(0); setIsTimerRunning(false); setShowWarning(false); document.body.style.backgroundColor = "white";}}>Reset Race</button>
      <button onClick={() => {setShowWarning(false); document.body.style.backgroundColor = "white";}}>Cancel</button>
    </div>
  )
  
  test();
 
  function resetTimer() {
    document.body.style.backgroundColor = "rgb(128,128,128)";
    setShowWarning(true);
  }

  useEffect(() => {
    let interval;
    if (isTimerRunning) {interval = setInterval(() => setTime(currentTime + 1), 10)}
    return () => clearInterval(interval);
  }, [isTimerRunning, currentTime]);

  const hours = Math.floor(currentTime / 360000);
  const minutes = Math.floor((currentTime % 360000) / 6000);
  const seconds = Math.floor((currentTime % 6000) / 100);
  const milliseconds = currentTime % 100;
  return (
    <>
      <div className={showWarning ? styles.shadow : styles.normal}>
      <Head>
        <title>Race Recorder</title>
      </Head>
      <h1 id='stopWatch'>{`${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`}</h1>
      <div>
        {isTimerRunning ? <button onClick={startAndStop}>Stop</button> : <button onClick={startAndStop}>Start</button>}
       <button onClick={resetTimer}>Reset</button>
      </div>
      <RaceTimes hours={hours} minutes={minutes} seconds={seconds} milliseconds={milliseconds} isTimerRunning={isTimerRunning} />
    </div>
    <div className={showWarning ? styles.warningFull : styles.warningNone}>{resetWarningElement}</div>
    </>
  );
}



export default RaceRecorder;