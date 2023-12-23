import Head from 'next/head';
var text = "Testing 123";
import RaceTimes from '../components/RaceTimes';

let currentTime = 0;

setInterval(() => {
    currentTime += 0.01;
}, 10);

let raceTimes = [15.25, 17.62, 18.00, 19.89];

function RaceRecorder() {
    return (
        <>
            <Head>
                <title>Race Recorder</title>
            </Head>
            <h1>{text}</h1>
            <RaceTimes times={raceTimes} />
        </>
    );
}

export default RaceRecorder;