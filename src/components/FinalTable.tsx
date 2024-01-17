import React, {FC, useEffect, useState} from 'react';
import {Player} from "../models/Player";

interface Winner {
    name: string;
    date: string;
    time: string;
}

interface FinalTableProps {
    currentPlayer: Player | null;
    totalGames: number;
}

const FinalTable: FC<FinalTableProps> = ({ currentPlayer, totalGames }) => {
    const [winners, setWinners] = useState<Winner[]>([]);

    useEffect(() => {
        const storedWinners = localStorage.getItem('winners');
        if (storedWinners) {
            setWinners(JSON.parse(storedWinners));
        }
    }, []);

    useEffect(() => {
        if (currentPlayer) {
            const winnerName = currentPlayer.color === 'black' ? 'Белый игрок' : 'Черный игрок';
            const date = new Date();
            const winnerDate = date.toLocaleDateString();
            const winnerTime = date.toLocaleTimeString();
            setWinners(prev => [...prev, { name: winnerName, date: winnerDate, time: winnerTime }]);
        }
    }, [currentPlayer]);

    useEffect(() => {
        localStorage.setItem('winners', JSON.stringify(winners));
    }, [winners]);

    return (
        <div className="d-flex align-items-center flex-column">
            <p>Общее количество сыгранных игр на этом устройстве: {totalGames}</p>
            <table className="final-table text-center">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Победители</th>
                    <th>Дата</th>
                    <th>Время</th>
                </tr>
                </thead>
                <tbody>
                {winners.map((winner, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{winner.name}</td>
                        <td>{winner.date}</td>
                        <td>{winner.time}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default FinalTable;
