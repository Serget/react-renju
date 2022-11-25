import React from "react";
import Tile from "./Tile";
import styles from './styles/Board.module.css'

export default class Board extends React.Component {
    render() {
        const drawTiles = () => {
            let tiles = []
            for(let i=0;i<225;i++) {
                tiles.push(
                    <Tile
                        key={i}
                        tileColor={this.props.squares[i]}
                        highlightTile={ false }
                        onClick={() => this.props.onClick(i)}
                    />
                )
            }
            return(
                tiles
            )
        }
        return(
            <div className={styles.Board}>
                {drawTiles()}
            </div>
        )
    }
}