import React from "react";

const Square = ({lineWin, onClick, value}) => {
    let ClassName= 'square ' + (lineWin ? 'highlight' : '');
    return (
      <button className={ClassName} onClick={onClick}>
        {value}
      </button>
    );
}

export default Square;