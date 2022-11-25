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
        
        console.log(col, row)

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