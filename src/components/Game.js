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
                row: null
            }],
            bNext: true,
            currentStep: 0
        }
    }

    state = this.initialize();

    resetGame = () => {
        this.setState(this.initialize())
    }

    // Handle tile click
    handleClickTile = i => {
        console.log('handle click', i)
        const history = this.state.history.slice(0, this.state.currentStep + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(squares[i]) return false;
        squares[i] = this.state.bNext ? 'black' : 'white';
        
        const col = (i % 15) + 1
        const row = Math.ceil((i + 1)/15)

        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    col: col,
                    row: row
                }
            ]),
            bNext: !this.state.bNext,
            currentStep: history.length
        })
    }
    
    jumpTo(i) {
        this.setState({
            currentStep: i,
            bNext: !(i % 2)
        })
    }

    checkWinner(squares, col, row) {
        // horizontal
        let result = []
        for(let j = 0; j<=14; j++) {
            let i = 15 * (row-1);
            if(squares[i]!=null) {
                if(!result) {
                    result.push(squares[i]);
                } else {
                    if(result) {

                    }
                }
            }
        }

        return false
    }

    render () {
        const history = this.state.history.slice();
        const current = history[this.state.currentStep];
        return(
            <>
                <Header />
                <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClickTile(i)}
                />
                <History 
                    history={history}
                    onClick={() => this.resetGame()}
                    onJump={(i) => this.jumpTo(i)}
                    next={this.state.bNext}
                    current={this.state.currentStep}
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
    {id: 24, value: 'white'},
    {id: 25, value: 'black'},
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
      if(element===arr[i].value) {
        prev.count = count + 1;
        prev.elementIds.push(arr[i].id);
      } else {
        prev.count = 1;
        prev.elementIds = [arr[i].id];
      }
      prev.element = arr[i].value;
      if(count === 4 && element === arr[i].value){
        if(arr[i+1] && arr[i+1].value!=element) {
            return prev.elementIds;
        }
      };
   };
   return false;
};
console.log(checkConsequence(arr));