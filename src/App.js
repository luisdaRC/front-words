import React from 'react';
import useState from 'global-hook-store';
import MatrixInputSize from "./components/MatrixInputSize";
import MatrixInput from "./components/MatrixInput";
import GlobalState from "./components/GlobalState";
import './App.css';

function App() {
    const { actions, state } = useState(GlobalState);
    const matrix = state.matrix;
    const matrixSize = state.matrixSize;

  return (
    <div className="App">

        <h3>Enter the size of the matrix</h3>
        <MatrixInputSize setMatrixSize={object => actions.setMatrixSize(object)} />
        <br/><br/>
        <MatrixInput matrixSize={matrixSize} setMatrix={matrix => actions.setMatrix(matrix)} />

    </div>
  );
}

export default App;
