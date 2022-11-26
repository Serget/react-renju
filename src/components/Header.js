import React from "react";
import styles from "./styles/Header.module.css"
class Header extends React.Component {
    render() {
        return(
            <div className={styles.Header}>
                <h1>Renju Game</h1>
                <p>The first who placed 5 in a row (horizontally, vertically or diagonally) wins.</p>
            </div>
        )
    }
}

export default Header;