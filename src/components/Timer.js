import { useEffect, useRef, useState } from 'react'; '../components/Timer';

export default function Timer( {pRef} ) {
    const [currentTime, setTime] = useState(0);
    // console.log( stopWatch)
    useEffect(() => {
        let interval = setInterval(() => setTime(currentTime + 1), 10);
        return () => clearInterval(interval);
    });
    return <h1 ref={pRef} id='stopWatch'>{currentTime}</h1>
}