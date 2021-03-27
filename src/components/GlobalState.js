import { createStore } from 'global-hook-store';

const GlobalState = createStore(
    {
        matrixSize: 2,
        matrix: [["",""], ["",""]],
        found_words: ""

    }, {
        setMatrixSize: (state, matrixSize) => {
            const size = parseInt(matrixSize.target.value)
            return {...state,
            matrixSize: size}
        },
        setMatrix: (state, matrix) => {
            return {...state,
            matrix: matrix}
        },
        setFoundWords: (state, found_words) =>{
            return {...state,
            found_words: found_words}
        }

    }
);

export default GlobalState;
