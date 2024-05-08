import './Sidebar.css';

import boardIconGrey from '../assets/icon-board-grey.svg';
import boardIconPurple from '../assets/icon-board-purple.svg';
import boardIconWhite from '../assets/icon-board-white.svg';
import lightTheme from '../assets/icon-light-theme.svg';
import darkTheme from '../assets/icon-dark-theme.svg';
import { useState } from 'react';

export default function Sidebar() {
    
    const [isLight, toggleLightMode] = useState(true);
    
    function toggleTheme() {
        toggleLightMode(prev => !prev);
    }

    return (
        <div className="Sidebar">
            <h4 className="all-boards-title">all boards (<span>3</span>)</h4>
            
            <div className="board-btn selected-board-btn">
                <img className="board-icon" src={boardIconWhite}/>
                <h3>Platform Launch</h3>
            </div>
            <div className="board-btn">
                <img className="board-icon" src={boardIconGrey}/>
                <h3>Marketing Plan</h3>
            </div>
            <div className="board-btn">
                <img className="board-icon" src={boardIconGrey}/>
                <h3>Roadmap</h3>
            </div>

            <div className="board-btn new-board-btn">
                <img className="board-icon" src={boardIconPurple}/>
                <h3>+ Create New Board</h3>
            </div>

            <div className="theme-settings">
                <img src={lightTheme}/>
                <div className="toggle-theme-btn" onClick={toggleTheme}>
                    <div className={`toggler ${isLight ? 'light' : 'dark'}-stance`}></div>
                </div>
                <img src={darkTheme}/>
            </div>
        </div>
    )
}