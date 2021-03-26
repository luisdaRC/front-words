import React from 'react';

function MatrixInputSize(setMatrixSize) {

    return (
        <input
            type="number"
            defaultValue={2}
            onChange={e => {
                const size = parseInt(e.target.value)
                if (2 <= size) {
                    setMatrixSize(prevSize => ({
                        columns: size,
                        rows: size,
                    }))
                }
            }}
        />

    );
}

export default MatrixInputSize;
