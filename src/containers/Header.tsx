import './Header.css';

import mobileLogo from '../assets/logo-mobile.svg';
import lightLogo from '../assets/logo-light.svg';
import darkLogo from '../assets/logo-dark.svg';

import chevronDown from '../assets/icon-chevron-down.svg';
import chevronUp from '../assets/icon-chevron-up.svg';
import addTask from '../assets/icon-add-task-mobile.svg';
import threeEllipses from '../assets/icon-vertical-ellipsis.svg';

import { useState } from 'react';
import Sidebar from './Sidebar';

export default function Header() {
    const [showSidebar, setShowSidebar] = useState(false);
    
    function toggleSidebar(): void {
        setShowSidebar(prev => !prev);
    }

    return (
        <header className="Header">
            <div className="header-left-div">
                <img className="logo" src={mobileLogo}/>
                <div className="title-div"
                        onClick={toggleSidebar}>
                    <h2 className="board-title">Platform Launch</h2>
                    <img
                        className="title-chevron"
                        src={showSidebar ? chevronUp : chevronDown}
                    />
                </div>
            </div>
            <div className="header-right-div">
                <img className="add-task-btn disabled" src={addTask}/>
                <img className="options-btn" src={threeEllipses}/>
            </div>

            {showSidebar && <Sidebar />}
        </header>
    )
}