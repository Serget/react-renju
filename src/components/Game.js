import React from "react";
import Board from "./Board";
import History from "./History";
import Header from "./Header";


class Game extends React.Component {
    // Initialize function for state
    initialize = () => {
        return {
            history:[{
                squares: Array(225).fill(null),
                col: null,
                row: null,
            }],
            bNext: true,
            currentStep: 0,
            winner: false
        }
    }

    state = this.initialize();

    resetGame = () => {
        this.setState(this.initialize())
    }

    // Handle tile click
    handleClickTile = i => {
        if(this.state.winner) return false;
        console.log('handle click', i)
        const history = this.state.history.slice(0, this.state.currentStep + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if(squares[i]) return false;
        squares[i] = this.state.bNext ? 'black' : 'white';
        
        const col = (i % 15) + 1
        const row = Math.ceil((i + 1)/15)
        let winner = this.checkWinner(squares, col, row);
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    col: col,
                    row: row
                }
            ]),
            bNext: !this.state.bNext,
            currentStep: history.length,
            winner: winner
        })
    }
    
    jumpTo(i) {
        let winner = false;
        if(i==this.state.history.length-1) {
            let history = this.state.history.slice();
            let squares = history[history.length-1].squares;
            let col = history[history.length-1].col;
            let row = history[history.length-1].row;
            winner = this.checkWinner(squares, col, row);
        }
        this.setState({
            currentStep: i,
            bNext: !(i % 2),
            winner: winner
        })
    }

    checkWinner(squares, col, row) {
        // horizontal
        let consequence = [];
        let result = false;
        let i = 15 * (row-1);
        for(let j = 0; j<=14; j++) {
            consequence.push( {id: i+j, value: squares[i+j]} );
        }
        result = checkConsequence(consequence);
        if(result) return result;
        
        // vertical
        consequence = [];
        result = false;
        i = col-1;
        for(let j = 0; j<=14; j++) {
            consequence.push( {id: i+(j*15), value: squares[i+(j*15)]} );
        }
        result = checkConsequence(consequence);
        if(result) return result;

        // diagonal-right
        consequence = [];
        result = false;
        let tmpCol = col;
        let tmpRow = row;
        while(tmpCol>0 && tmpRow>0) {
            tmpCol--;
            tmpRow--;
        }
        while(tmpCol<15 && tmpRow<15) {
            tmpCol++;
            tmpRow++;
            i = (tmpRow-1)*15 + tmpCol - 1;
            consequence.push( {id: i, value: squares[i]} );
        }
        result = checkConsequence(consequence);
        if(result) return result;

        // diagonal-left
        consequence = [];
        result = false;
        tmpCol = col;
        tmpRow = row;
        while(tmpCol<16 && tmpRow>0) {
            tmpCol++;
            tmpRow--;
        }
        console.log(tmpCol, tmpRow)
        while(tmpCol>0 && tmpRow<16) {
            tmpCol--;
            tmpRow++;
            i = (tmpRow-1)*15 + tmpCol - 1;
            consequence.push( {id: i, value: squares[i]} );
        }
        result = checkConsequence(consequence);
        if(result) return result;

        return false
    }

    render () {
        const history = this.state.history.slice();
        const current = history[this.state.currentStep];
        const winner = this.state.winner;
        return(
            <>
                <Header />
                <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClickTile(i)}
                    winner={winner}
                />
                <History 
                    history={history}
                    onClick={() => this.resetGame()}
                    onJump={(i) => this.jumpTo(i)}
                    next={this.state.bNext}
                    current={this.state.currentStep}
                    winner={winner}
                />
            </>
        )
    }
}
export default Game;

const arr = [
    {id: 15, value: 'white'},
    {id: 16, value: 'white'},
    {id: 17, value: 'white'},
    {id: 18, value: 'white'},
    {id: 19, value: 'black'},
    {id: 20, value: 'white'},
    {id: 21, value: 'white'},
    {id: 22, value: 'white'},
    {id: 23, value: 'white'},
    {id: 24, value: 'black'},
    {id: 25, value: 'white'},
    {id: 26, value: 'white'},
    {id: 27, value: 'white'},
    {id: 28, value: 'white'},
    {id: 29, value: 'white'},
];
const checkConsequence = arr => {
   let prev = {
      element: null,
      count: 0,
      elementIds: []
   };
   for(let i = 0; i < arr.length; i++){
      const { count, element } = prev;
      if(element && element===arr[i].value) {
        prev.count = count + 1;
        prev.elementIds.push(arr[i].id);
      } else {
        prev.count = 1;
        prev.elementIds = [arr[i].id];
      }
      prev.element = arr[i].value;
      if(count === 4 && element === arr[i].value){
        if((arr[i+1] && arr[i+1].value!=element) || !arr[i+1]) {
            return prev.elementIds;
        }
      };
   };
   return false;
};
console.log(checkConsequence(arr));