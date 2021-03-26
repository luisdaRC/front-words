import React from 'react';
import useState from 'global-hook-store';
import MatrixInputSize from "./components/MatrixInputSize";
import MatrixInput from "./components/MatrixInput";
import GlobalState from "./components/GlobalState";
import Card from "react-bootstrap/Card";
import './App.css';

function App() {
    const { actions, state } = useState(GlobalState);
    const matrix = state.matrix;
    const matrixSize = state.matrixSize;

  return (
    <div className="App">
        <div id="navbar">
            <ul>
                <li><a href="https://github.com/luisdaRC/front-words" target="_blank">Front-End Code</a></li>
                <li><a href="https://github.com/luisdaRC/words-detector" target="_blank">Back-End Code</a></li>
            </ul>
        </div>
        <br/>
        <h1 className="h1-props">Enter the size of the matrix</h1>
            <br/>
        <MatrixInputSize setMatrixSize={object => actions.setMatrixSize(object)} />
        <br/><br/>
        <Card.Subtitle> <b>Note</b>: Remember that you should only enter letters in the matrix.</Card.Subtitle>
        <br/>
        <MatrixInput matrixSize={matrixSize} setMatrix={matrix => actions.setMatrix(matrix)} />

    </div>
  );
}

export default App;
