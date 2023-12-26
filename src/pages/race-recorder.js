import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import Timer from '../components/Timer';

function RaceRecorder() {

    const stopWatch = useRef(null );
    console.log(stopWatch)
    const currentTime = stopWatch.current;

    const hours = Math.floor(currentTime / 360000);
    const minutes = Math.floor((currentTime % 360000) / 6000);
    const seconds = Math.floor((currentTime % 6000) / 100);
    const milliseconds = currentTime % 100;

    return (
        <>
            <Head>
                <title>Race Recorder</title>
            </Head>
            <Timer pRef={stopWatch} />
            
        </>
    );
}

function RaceTimes( {hours, minutes, seconds, milliseconds} ) {

    const [times, setTimes] = useState([]);
    function recordTime() {
        const insertAt = times.length; // Could be any index
        const nextTimes = [
          // Items before the insertion point:
          ...times.slice(0, insertAt),
          // New item:
            `${hours}:
            ${minutes.toString().padStart(2, "0")}:
            ${seconds.toString().padStart(2, "0")}:
            ${milliseconds.toString().padStart(2, "0")}`,
          // Items after the insertion point:
          ...times.slice(insertAt)
        ];
        setTimes(nextTimes);
    }
    return (
        <>
            <button onClick={recordTime()}>Record</button>
            <h2>Times</h2>
            <div>hi</div>
        </>
    )
}

export default RaceRecorder;