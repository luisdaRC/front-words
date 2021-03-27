import React from 'react';
import '../App.css';
import useState from "global-hook-store";
import GlobalState from "./GlobalState";
import MatrixRow from "./MatrixRow";
const Swal = require('sweetalert2');

function MatrixInput(socket,matrixSize, matrix){
    const { actions, state } = useState(GlobalState);

    matrix = state.matrix;
    matrixSize = state.matrixSize;

    matrix = Array(matrixSize)
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = new Array(matrixSize).fill("")
    }

    function handleSubmit (event, matrix) {

        event.preventDefault();
        let count = 0;
        let flag = true;
        for (let i = 0; i < matrixSize; i++) {
            for (let j = 0; j < matrixSize; j++) {

                // If the value is not an empty string, then is assigned
                if (event.target[count].value!==""){
                    matrix[i][j] = event.target[count].value;
                }else {
                    flag = false;
                    Swal.fire('Oops...', 'It looks like some field in the matrix is not filled.', 'Alert');
                }
                count += 1;

            }
        }

        if(socket.socket.readyState === WebSocket.OPEN) {

            if (flag) {
                state.matrix = actions.setMatrix(matrix);
                const matrix_string = JSON.stringify(matrix);

                // Send the message to onMessage route in lambda
                const toSend = '{"action":"onMessage","matrix":' + matrix_string + '}';
                socket.socket.send(toSend);
                Swal.fire('Sending matrix', 'Your words will be found soon.', '');
            }
        }else if(socket.socket.readyState === WebSocket.CLOSED){
            Swal.fire('Reload application', 'Connection with server has been lost.', 'Alert');
        }
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
        <button className="Button">{"Find my words!"}</button>
    </form>

)
}

export default MatrixInput;
