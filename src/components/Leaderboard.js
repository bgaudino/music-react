import React from 'react';
import { useState, useEffect } from 'react';

export default function Leaderboard() {

    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch('https://sheet.best/api/sheets/fa8cefd4-9b56-41da-8404-f1bb6419f02c')
        .then(res => res.json())
        .then(data => setRows(data))
        .catch(err => console.log(err));
    }, [])

    return (
        <div className="content">
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Correct</td>
                        <td>Attempts</td>
                        <td>PCT</td>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => {
                        return (
                            <tr>
                                <td>{row.name}</td>
                                <td>{row.numCorrect}</td>
                                <td>{row.numAttempts}</td>
                                <td>{row.pct}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        
    )
}