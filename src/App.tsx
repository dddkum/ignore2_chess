import React, {useEffect, useState} from 'react';
import "./App.scss";
import BoardComponent from "./components/BoardComponent";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";
import FinalTable from "./components/FinalTable";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";

const App = () => {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    const [isGameEnded, setIsGameEnded] = useState(false)
    const [totalGames, setTotalGames] = useState(0)

    useEffect(() => {
        restart()
        setCurrentPlayer(whitePlayer);

        const storedTotalGames = localStorage.getItem('totalGames');
        if (storedTotalGames) {
            setTotalGames(Number(storedTotalGames));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('totalGames', String(totalGames));
    }, [totalGames]);

    useEffect(() => {
        if (isGameEnded) {
            setTotalGames(prev => prev + 1);
        }
    }, [isGameEnded]);


    function restart() {
        const newBoard = new Board();
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard)
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

    return (
        <div className="app bg-danger-subtle vw-100 vh-100 d-flex align-items-center justify-content-around">
            {isGameEnded ?
                <FinalTable
                    currentPlayer={currentPlayer}
                    totalGames={totalGames}
                />
                :
                <>
                    <Timer
                        restart={restart}
                        currentPlayer={currentPlayer}
                        setIsGameEnded={setIsGameEnded}
                    />
                </>
            }
            <BoardComponent
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}
            />
            <div>
                <LostFigures
                    title="Черные фигуры"
                    figures={board.lostBlackFigures}
                />
                <LostFigures
                    title="Белые фигуры"
                    figures={board.lostWhiteFigures}
                />
            </div>
        </div>
    );
};

export default App;
