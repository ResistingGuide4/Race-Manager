import Head from 'next/head';
import { useState, useEffect } from 'react';
import RaceTimes from '../components/RaceTimes';

function RaceRecorder() {
		const [currentTime, setTime] = useState(0);
		const [isTimerRunning, setIsTimerRunning] = useState(false);
		let needResetTimes = false;

		function startAndStop() {
				setIsTimerRunning(!isTimerRunning);
		}

		function resetTimer() {
				setTime(0);
				setIsTimerRunning(false);
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
						<Head>
								<title>Race Recorder</title>
						</Head>
						<h1 id='stopWatch'>{`${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`}</h1>
						<div>
								{isTimerRunning ? <button onClick={startAndStop}>Stop</button> : <button onClick={startAndStop}>Start</button>}
							<button onClick={resetTimer}>Reset</button>
						</div>
						<RaceTimes hours={hours} minutes={minutes} seconds={seconds} milliseconds={milliseconds} />
				</>
		);
}



export default RaceRecorder;