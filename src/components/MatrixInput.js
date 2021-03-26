import React from 'react';
import '../App.css';
import useState from "global-hook-store";
import GlobalState from "./GlobalState";
import MatrixRow from "./MatrixRow";
const Swal = require('sweetalert2');

function MatrixInput(matrixSize,matrix){
    const { actions, state } = useState(GlobalState);
    matrix = state.matrix;
    matrixSize = state.matrixSize;
    console.log("Matrix alv",matrix)
    console.log("MatrixSize", matrixSize)

    matrix = Array(matrixSize)
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = new Array(matrixSize).fill("")
        console.log(matrix[i]);
    }

    function handleSubmit (event,matrix) {
        event.preventDefault();
        console.log(matrixSize);
        console.log("What enters? : ",matrix);
        let count = 0;
        let flag = true;
        for (let i = 0; i < matrixSize; i++) {
            for (let j = 0; j < matrixSize; j++) {

                // If the value is not an empty string, then is assigned
                if (event.target[count].value!==""){
                    matrix[i][j] = event.target[count].value;
                }else {
                    flag = false;
                    Swal.fire('Oops...', 'It Looks like some field in the matrix is not filled.', 'Alert');
                }
                //matrix[i][j] = !isNaN(event.target[count].value) ? event.target[count].value : 0;
                console.log("Event.target: ",event.target[count].value);
                count += 1;

            }
        }

        if (flag){
            state.matrix= actions.setMatrix(matrix);
        }
        console.log("What is outside? : ",matrix);

    }

    return(
        <form onSubmit={(e) => handleSubmit(e, matrix)}>
            {matrix.map((row, indexRow = 1) => {
                return (
                    <MatrixRow key={indexRow}>
                        {row.map((item, indexColumn = 1) => {
                            return (
                                <input className="width-height"
                                       key={indexRow + " " + indexColumn}
                                       type="text"
                                       maxLength="1"
                                       pattern="[A-Za-z\\s]*"
                                       defaultValue={""}
                                       name={indexRow + "," + indexColumn}
                                />
                            )
                        })}
                    </MatrixRow>
                )
            })}
            <br/><br/>
            <button className="Button">{"Send matrix"}</button>
        </form>

    )

}



export default MatrixInput;
