import React from 'react';
import { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function Leaderboard() {

    const [rows, setRows] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch('https://sheet.best/api/sheets/fa8cefd4-9b56-41da-8404-f1bb6419f02c')
        .then(res => res.json())
        .then(data => {
            setRows(data);
            setIsLoaded(true);
        })
        .catch(err => console.log(err));
    }, [])

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
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="center">Correct</TableCell>
                            <TableCell align="center">Attempts</TableCell>
                            <TableCell align="center">PCT</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" cope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.numCorrect}</TableCell>
                                <TableCell align="center">{row.numAttempts}</TableCell>
                                <TableCell align="center">{row.pct}%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        
    )
}