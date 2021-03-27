import React from 'react';
import useState from "global-hook-store";
import GlobalState from "./GlobalState";

function MatrixOutput(matrix){
    const {state} = useState(GlobalState);
    matrix = state.matrix;
    const matrix_string = JSON.stringify(matrix);
    let found_words = ""

    const socket = new WebSocket("wss://25zf7whaca.execute-api.us-east-1.amazonaws.com/dev");

    socket.onopen = () => {
        // On connecting, just log it to the console
        console.log('Successfully connected to webSocket');
    }

    // Send the message to onMessage route in lambda
    const toSend = '{"action":"onMessage","matrix":'+matrix_string+'}';
    socket.send(toSend);

    socket.onmessage = evt => {
        // Listen to data sent from the websocket server
        const message = JSON.parse(evt.data);

        found_words = message["message"]
        console.log("Lets see inside of found words: ", found_words);
        //Take a look at what does this message have and then get the info
        console.log(message)
    }

    socket.onclose = () => {
        console.log('Connection closed');
    }

    return (
        <>
        <div>
            <h2>List of found words.</h2>
            {found_words}
        </div>
        </>
    )
}

export default MatrixOutput;
