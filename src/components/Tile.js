import React from "react";
import styles from './styles/Tile.module.css'

const Tile = props => {
    let classNames = []
    classNames.push(styles.tile);
    if(props.tileColor=='black') classNames.push(styles.black);
    if(props.tileColor=='white') classNames.push(styles.white);
    return (
        <div 
            className={classNames.join(' ')}
            onClick={props.onClick}
        ></div>
    )
}

export default Tile;