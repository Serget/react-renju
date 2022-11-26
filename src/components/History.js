import React from "react";
import styles from './styles/History.module.css'

class History extends React.Component {
    render() {
        let text = 'Next Player:';
        let classes = [];
        if(this.props.winner) {
            classes.push( styles[this.props.history[this.props.history.length - 1].squares[this.props.winner[0]]] );
            classes.push('winner');
            text = 'Winner:';
        } else {
            classes.push(this.props.next ? styles.black : styles.white);
        }
        return(
            <div>
            <button onClick={this.props.onClick}>Reset Game</button>
            <div className="nextPlayer">{text} <div className={ classes.join(' ') }></div></div>
            <h3>History</h3>
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
        )
    }
}
export default History;