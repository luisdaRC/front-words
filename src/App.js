import React from 'react';
import useState from 'global-hook-store';
import MatrixInputSize from "./components/MatrixInputSize";
import MatrixInput from "./components/MatrixInput";
import GlobalState from "./components/GlobalState";
import Card from "react-bootstrap/Card";
import './App.css';
import MatrixOutput from "./components/MatrixOutput";
const socket = new WebSocket("wss://25zf7whaca.execute-api.us-east-1.amazonaws.com/dev");

function App() {
    const { actions, state } = useState(GlobalState);
    const matrixSize = state.matrixSize;

    //As soon as the app starts, the socket opens its connection
    socket.onopen = () => {}

  return (
    <div className="App">
        <div id="navbar">
            <ul>
                <li><a href="https://github.com/luisdaRC/front-words" target="_blank" rel="noreferrer">Front-End Code</a></li>
                <li><a href="https://github.com/luisdaRC/words-detector" target="_blank" rel="noreferrer">Back-End Code</a></li>
            </ul>
        </div>
        <br/>
        <div className="row">
            <div class="column left">
                <h1 className="h1-props">Enter the size of the matrix</h1>
                    <br/>
                <MatrixInputSize setMatrixSize={object => actions.setMatrixSize(object)} />
                <br/><br/>
                <Card.Subtitle> <b>Note</b>: Remember that you should only enter letters in the matrix.</Card.Subtitle>
                <br/>
                <MatrixInput socket={socket} matrixSize={matrixSize} setMatrix={matrix => actions.setMatrix(matrix)} />
            </div>
            <div class="column right">
                <MatrixOutput socket={socket}/>
            </div>
        </div>
    </div>
  );
}

export default App;
