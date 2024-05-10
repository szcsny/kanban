import { useState } from 'react';
import './Board.css';

import Column from './Column';

export default function Board() {
    const [showOverlay, setShowOverlay] = useState(false);
    
    return (
        <div className="Board">

            <div className="empty-board-div">
                <h3>This board is empty. Create a new column to get started.</h3>
                <button className="button">+ Add New Column</button>
            </div>

            <Column name="todo"/>
            <Column name="doing"/>
            <Column name="done"/>

            <div className="board-overlay"></div>
        </div>
    )
}