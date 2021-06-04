import React from 'react';
import { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

export default function Leaderboard(props) {

    const [rows, setRows] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [game, setGame] = useState(props.game);

    useEffect(() => {
        if (!game) setGame(() => 'Note ID');
        fetch('https://sheet.best/api/sheets/fa8cefd4-9b56-41da-8404-f1bb6419f02c')
        .then(res => res.json())
        .then(data => {
            setRows(data.sort((a, b) => b.numCorrect - a.numCorrect));
            setIsLoaded(true);
            (game) ?  filterByGame(game) : filterByGame('Note ID');
        })
        .catch(err => console.log(err));
// eslint-disable-next-line
    }, [])

    const filterByGame = (game) => {
        setGame(game);
        const buttons = Array.from(document.querySelectorAll('.toggle'));
        buttons.forEach(button => {
            if (button.innerText === game.toUpperCase()) {
                button.style.backgroundColor = '#6441a5';
                button.style.color = 'white';
            } else {
                button.style.backgroundColor = 'inherit';
                button.style.color = 'black';
            }
        })
    }
    
    if (!isLoaded) {
        return (
            <div className="content">
                <h2>Leaderboard</h2>
                <div>...loading</div>
            </div>
        )
    }
    return (
        <div className="content">
            <h2>Leaderboard</h2>
            <div>
                <Button className = 'toggle' onClick={() => filterByGame('Note ID')}>Note ID</Button> 
                | 
                <Button  className = 'toggle' onClick={() => filterByGame('Interval ET')}>Interval ET</Button>
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"><strong>Name</strong></TableCell>
                            <TableCell align="center"><strong>No. Correct</strong></TableCell>
                            <TableCell align="center"><strong>Attempts</strong></TableCell>
                            <TableCell align="center"><strong>PCT</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            if (row.game === game) {
                                return (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" cope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center">{row.numCorrect}</TableCell>
                                        <TableCell align="center">{row.numAttempts}</TableCell>
                                        <TableCell align="center">{row.pct}%</TableCell>
                                    </TableRow>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        
    )
}
