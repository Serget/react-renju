import React from "react";
import styles from './styles/History.module.css'

class History extends React.Component {
    render() {
        let text = 'Next Player:';
        let currentPlayerClass = [];
        let winnerClass = [];
        winnerClass.push(styles.nextPlayer)
        if(this.props.winner) {
            currentPlayerClass.push( styles[this.props.history[this.props.history.length - 1].squares[this.props.winner[0]]] );
            winnerClass.push(styles.Winner);
            text = 'Winner:';
        } else {
            currentPlayerClass.push(this.props.next ? styles.black : styles.white);
        }
        return(
            <div className={styles.History}>
                <button className={styles.Button} onClick={this.props.onClick}>Reset Game</button>
                <div className={ winnerClass.join(' ') }>{text} <div className={ currentPlayerClass.join(' ') }></div></div>
                <h3>History</h3>
                <div className={styles.historySteps}>
                {
                this.props.history.map((val, index) => {
                    if(index) {
                        return (
                            <div 
                                className={index==this.props.current ? styles.currentStep : null}
                                key={index}
                                onClick={() => this.props.onJump(index)}
                            >
                                Step {index} <span>({val.col}, {val.row})</span>
                            </div>
                        )
                    }
                }).reverse()
                }
                </div>
            </div>
        )
    }
}
export default History;