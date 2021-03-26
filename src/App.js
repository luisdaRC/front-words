import React from 'react';
import useState from 'global-hook-store';
//import MatrixInputSize from "./components/MatrixInputSize";
//import MatrixInput from "./components/MatrixInput";
import MatrixRow from "./components/MatrixRow";
import GlobalState from "./components/GlobalState";
import './App.css';

function App() {
    const { actions, state } = useState(GlobalState);
    const matrix = state.matrix;
    const matrixSize = state.matrixSize;

  return (
    <div className="App">
        <MatrixInputSize setMatrixSize={object => actions.setMatrixSize(object)} />

        <MatrixInput matrixSize={matrixSize} setMatrix={matrix => actions.setMatrix(matrix)} />
    </div>
  );
}

function MatrixInputSize() {
    const {actions} = useState(GlobalState);

    return (
        <>
            <input
                type="number"
                defaultValue={3}
                onChange={event => { if (2<=event.target.value) {actions.setMatrixSize(event)}}}
            />
        </>
    );
}

function MatrixInput(matrixSize,matrix){
    const { actions, state } = useState(GlobalState);
    matrix = state.matrix;
    matrixSize = state.matrixSize;
    console.log("Matrix alv",matrix)
    console.log("MatrixSize", matrixSize)

    matrix = Array(matrixSize)
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = new Array(matrixSize).fill(0)
        console.log(matrix[i])
    }

    function handleSubmit (event,matrix) {
        event.preventDefault();
        console.log(event)
        console.log(matrixSize)
        console.log("What enters? : ",matrix)
        let count = 0;
        for (let i = 0; i < matrixSize; i++) {
            for (let j = 0; j < matrixSize; j++) {
                // If the int number cannot be parsed, we set 0 for this value
                matrix[i][j] = !isNaN(parseInt(event.target[count].value)) ? parseInt(event.target[count].value) : 0;
                console.log("Event.target: ",event.target[count].value)
                count += 1;

            }
        }
        console.log("What exits? : ",matrix)
        if(matrix[0]!==undefined){
            console.log("Didn't ignore the setMatrix of handleSubmit ")
            state.matrix= actions.setMatrix();
        }else{
            console.log("Ignored the setMatrix of handleSubmit ")
        }


    }

    return(
        <form onSubmit={(e) => handleSubmit(e, matrix)}>
            {matrix.map((row, indexRow = 1) => {
                return (
                    <MatrixRow key={indexRow}>
                        {row.map((item, indexColumn = 1) => {
                            return (
                                <input
                                    key={indexRow + " " + indexColumn}
                                    type="text"
                                    defaultValue={0}
                                    name={indexRow + "," + indexColumn}
                                />
                            )
                        })}
                    </MatrixRow>
                )
            })}
            <button>{"Send matrix"}</button>
        </form>

    )

}

export default App;
