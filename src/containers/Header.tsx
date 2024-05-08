import './Header.css';

import mobileLogo from '../assets/logo-mobile.svg';
import lightLogo from '../assets/logo-light.svg';
import darkLogo from '../assets/logo-dark.svg';

import chevronDown from '../assets/icon-chevron-down.svg';
import addTask from '../assets/icon-add-task-mobile.svg';
import threeEllipses from '../assets/icon-vertical-ellipsis.svg';

export default function Header() {
    
    return (
        <header className="Header">
            <div className="header-left-div">
                <img className="logo" src={mobileLogo}/>
                <div className="title-div">
                    <h2 className="board-title">Platform Launch</h2>
                    <img className="title-chevron" src={chevronDown}/>
                </div>
            </div>
            <div className="header-right-div">
                <img className="add-task-btn disabled" src={addTask}/>
                <img className="options-btn" src={threeEllipses}/>
            </div>
        </header>
    )
}