function RaceTimes(props) {
    return (
        <>
            <h2>Times</h2>
            <div>{props.times.map((record, recordIndex) => {
                return (
                    <p key={recordIndex}><b>{(recordIndex+1).toString()+": "}</b>{record.toString()}</p>
                )
            })}</div>
        </>
    )
}

export default RaceTimes;