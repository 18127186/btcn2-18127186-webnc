import React from "react";
import Square from '../Square';
const Board = ({squares, onClick, lineWin, boardSize}) => {

    const renderSquare = (i) => {
      return <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        lineWin = {lineWin && lineWin.includes(i)}
      />
    }
    let newsquares = [];
    for (let i = 0; i < boardSize; i++) {
        let row = [];
        for (let j = 0; j < boardSize; j++) {
          row.push(renderSquare(i * boardSize + j));
        }
        newsquares.push(<div key={i} className="board-row">{row}</div>);
    }
    return (
        <div>{newsquares}</div>
    );
}
// class Board extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             squares: Array(boardSize*boardSize).fill(null),
//             xIsNext: true,
//         };
//     }


//     renderSquare(i) {
//       const lineWin = this.props.lineWin;
//       return <Square
//         value={this.props.squares[i]}
//         onClick={() => this.props.onClick(i)}
//         lineWin = {lineWin && lineWin.includes(i)}
//       />
//     }
  
//     render() {
//       let squares = [];
//       for (let i = 0; i < boardSize; i++) {
//         let row = [];
//         for (let j = 0; j < boardSize; j++) {
//           row.push(this.renderSquare(i * boardSize + j));
//         }
//         squares.push(<div key={i} className="board-row">{row}</div>);
//       }
//       return (
//         <div>{squares}</div>
//       );
//     }
//   }
export default Board