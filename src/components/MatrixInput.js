import React from 'react';
import '../App.css';

function MatrixInput(matrixSize, setMatrix){
    console.log(matrixSize)
    let matrix = Array(matrixSize.rows)
    for (let i = 0; i < matrixSize.rows; i++) {
        matrix[i] = new Array(matrixSize.columns).fill(0)
        console.log(matrix[i])
    }

    const handleSubmit = event => {
        event.preventDefault();
        let count = 0;
        for (let i = 0; i < matrixSize.rows; i++) {
            for (let j = 0; j < matrixSize.columns; j++) {
                // If the floating point number cannot be parsed, we set 0 for this value
                matrix[i][j] = !isNaN(parseFloat(event.target[count].value)) ? parseFloat(event.target[count].value) : 0;
                count += 1;
            }
        }
        setMatrix(matrix);
    }

    return(
        <form onSubmit={handleSubmit}>
            {console.log(matrix)}
            {matrix.map((row, indexRow = 1) => {
                return(
                    row.map((item, indexColumn = 1) => {
                        return (
                            <input
                                key={indexRow + " " + indexColumn}
                                type="text"
                                defaultValue={0}
                                name={indexRow + "," + indexColumn}
                            />
                        )
                    })
                )
            })}
            <button>{"Save A"}</button>
        </form>
    )

}



export default MatrixInput;
