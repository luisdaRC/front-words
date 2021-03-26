import { createStore } from 'global-hook-store';

const GlobalState = createStore(
    {
        matrixSize: 2,
        matrix: [["",""], ["",""]]

    }, {
        setMatrixSize: (state, matrixSize) => {
            const size = parseInt(matrixSize.target.value)
            return {...state,
            matrixSize: size}
        },
        setMatrix: (state, matrix) => {
            return {...state,
            matrix: matrix}
        }

    }
);

export default GlobalState;
