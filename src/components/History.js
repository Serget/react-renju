import React from "react";
import styles from './styles/History.module.css'

class History extends React.Component {
    render() {
        return(
            <div>
            <button onClick={this.props.onClick}>Reset Game</button>
            <div className="nextPlayer">Next Player: <div className={ this.props.next ? styles.black : styles.white }></div></div>
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