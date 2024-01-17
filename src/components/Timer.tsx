import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
    setIsGameEnded: (isGameEnded: boolean) => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart, setIsGameEnded}) => {
    const [blackTime, setBlackTime] = useState(1);
    const [whiteTime, setWhiteTime] = useState(300);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer()
    }, [currentPlayer])

    useEffect(() => {
        if (blackTime === 0) {
            setIsGameEnded(true)
            alert('Время черного игрока закончилось')
            clearInterval(timer.current!);
        }
        if (whiteTime === 0) {
            setIsGameEnded(true)
            alert('Время белого игрока закончилось')
            clearInterval(timer.current!);
        }
    }, [blackTime, whiteTime]);

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1)
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1)
    }

    const handleRestart = () => {
        setWhiteTime(300)
        setBlackTime(300)
        restart()
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="fw-medium fs-1">Черные - {blackTime}</div>
            <div className="fw-medium fs-1">Белые - {whiteTime}</div>
            <button className="btn btn-outline-danger w-100 mt-2" onClick={handleRestart}>Перезапустить игру</button>
        </div>
    );
};

export default Timer;
