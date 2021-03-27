import React from 'react';
import useState from "global-hook-store";
import GlobalState from "./GlobalState";

function MatrixInputSize() {
    const {actions} = useState(GlobalState);

    return (
        <>
            <input className="width-height-size"
                   type="number"
                   defaultValue={2}
                   onChange={event => { if (2<=event.target.value) {actions.setMatrixSize(event)}}}
            />
        </>
    );
}

export default MatrixInputSize;
