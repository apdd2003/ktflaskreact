// import TakeMeas from './TakeMeas';
import React from 'react';
// import AppRouter from '../AppRouter';
// import InputData from './InputData';
import { Outlet, BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './topbar.css';
function TopBar() {
    return (
        <>
            <div className='topbar'>
                <nav>
                    <ul>
                        <li>
                            <Link className='nlink' to="/">Home</Link>
                        </li>
                        <li>
                            <Link className='nlink' to="/history">Historical Data</Link>
                        </li>
                        <li>
                            <Link className='nlink' to="/download">Download</Link>
                        </li>
                    </ul>
                </nav>
                

            </div>
           
            <Outlet />
        </>
    );
}

export default TopBar;