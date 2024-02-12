import { supabase } from "../../api";

function raceRecorder() {
    return (
        <>
            <h2>Sign Up</h2>
            <form>
                <label for="username">Username: </label>
                <input name="username" />
                <label for="password">Password: </label>
                <input name="password" />
            </form>
        </>
    )
}

export default raceRecorder