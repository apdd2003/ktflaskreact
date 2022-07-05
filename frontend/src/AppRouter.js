import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Download from './components/Download';
import HistoricalData from './components/HistoricalData';
import TakeMeas from './components/TakeMeas';
import TopBar from './components/TopBar';
function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TopBar />}>
                    <Route exact path='/' element={< TakeMeas />}></Route>
                    <Route exact path='/history' element={< HistoricalData />}></Route>
                    <Route exact path='/download' element={< Download />}></Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRouter;