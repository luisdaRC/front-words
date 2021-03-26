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

        <MatrixInput matrixSize={matrixSize} setMatrix={matrix => actions.setMatrix()} />
    </div>
  );
}

function MatrixInputSize() {
    const {actions} = useState(GlobalState);

    return (
        <>
            <input
                type="number"
                defaultValue={2}
                onChange={event => { if (2<=event.target.value) {actions.setMatrixSize(event)}}}
            />
        </>
    );
}

function MatrixInput(){
    const { actions, state } = useState(GlobalState);
    const { matrix, matrixSize} = state;
    console.log("Matrix alv",matrix)
    console.log("MatrixSize", matrixSize)

    let data = Array(matrixSize)
    for (let i = 0; i < matrixSize; i++) {
        data[i] = new Array(matrixSize).fill(0)
        console.log(data[i])
    }

    function handleSubmit (event,data) {
        event.preventDefault();
        console.log(event)
        console.log(matrixSize)
        console.log("What enters? : ",data)
        let count = 0;
        for (let i = 0; i < matrixSize; i++) {
            for (let j = 0; j < matrixSize; j++) {
                // If the int number cannot be parsed, we set 0 for this value
                data[i][j] = !isNaN(parseInt(event.target[count].value)) ? parseInt(event.target[count].value) : 0;
                console.log("Event.target: ",event.target[count].value)
                count += 1;

            }
        }
        console.log("What exits? : ",data)
        if(data[0]!==undefined){
            console.log("Didn't ignore the setMatrix of handleSubmit ")
            actions.setMatrix(data);
        }else{
            console.log("Ignored the setMatrix of handleSubmit ")
        }


    }

    return(
        <form onSubmit={(e) => handleSubmit(e, data)}>
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
