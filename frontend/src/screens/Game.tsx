import { useSocket } from "../hooks/useSocket"
import { Button } from "../components/Button"
import { ChessBoard } from "../components/ChessBoard"
import { useEffect, useState } from "react";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MAKE_MOVE = "make_move";
export const GAME_OVER = "game_over";

//TODO : remove code repetition

export const Game = () => {
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [started , setStarted] = useState<Boolean>(false);

    useEffect(() => {
        if(!socket){
            return ;
        }
        socket.onmessage = (e) => {
            const message = JSON.parse(e.data)
            console.log("MESSAGE  :", message);
            switch(message.type){
                case INIT_GAME:
                    console.log("Game is initialized")
                    setStarted(true);
                    //setChess(new Chess());
                    setBoard(chess.board());
                    break;
                case MAKE_MOVE:
                    const move = message.payload 
                    chess.move(move)
                    setBoard(chess.board());
                    console.log("Move made")
                    break;
                case GAME_OVER:
                    console.log("Game over")
                    break;
                }
        }
    }, [socket]);

    if(!socket){
        return <div className="text-white">
            connecting ....
        </div>
    }
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="col-span-4 p-5 flex justify-center">
                    <ChessBoard chess={chess} setBoard={setBoard} socket={socket} board={board}/>
                </div>
                    <div className="col-span-2 bg-yellow-50 m-5 flex justify-center">
                        <div className="flex flex-col justify-center gap-4">
                            <div className="text-2xl text-center">
                                Stats
                            </div>
                            <div>
                                {!started && <Button 
                                onClick={() => {
                                    socket.send(JSON.stringify({
                                        type: INIT_GAME,
                                    }))
                                }}
                                >
                                   Start Playing 
                                </Button>}
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}