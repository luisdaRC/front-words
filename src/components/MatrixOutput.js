import useState from "global-hook-store";
import GlobalState from "./GlobalState";

function MatrixOutput(socket){
    const { actions, state } = useState(GlobalState);

    let found_words = state.found_words

    socket.socket.onmessage = evt => {
        // Listen to data sent from the websocket server
        const message = JSON.parse(evt.data);

        if (message['message']!==undefined) {
            state.found_words= actions.setFoundWords(message['message'])
        }
    }

    return (
        <>
            <div>
                <h2>List of found words.</h2>
                {found_words}
            </div>
        </>
    );

}

export default MatrixOutput;
