import { Color, PieceSymbol, Square } from "chess.js";
import { MAKE_MOVE } from "../screens/Game";
import { useState } from "react";

export const ChessBoard = ({board, socket, setBoard, chess}: {
    board : ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][] ,
    socket: WebSocket,
    setBoard: any,
    chess: any
})=> {
    const [from , setFrom] = useState<Square | null>(null)

    return (
        <div>
        {board.map((row,i) => {
            return <div key={i} className="flex">
                {row.map((square, j) => {
                    const squareRepresentation = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square; 
                    return <div onClick={() => 
                        {
                            if(!from){
                                setFrom(squareRepresentation)
                            } else {
                            socket.send(JSON.stringify({
                                type: MAKE_MOVE,
                                payload: { 
                                    move: {
                                        from,
                                        to: squareRepresentation
                                    }
                                }
                            }))
                            setFrom(null)
                            chess.move({
                                from,
                                to: squareRepresentation
                            })
                            setBoard(chess.board());            
                            console.log({
                                from,
                                to: squareRepresentation
                            })              
                        }
                            
                }} key={j} className={`w-16 h-16 ${(i+j)%2 === 0 ? 'bg-green-600' : 
                        'bg-yellow-50'}`}>
                            <div className="flex justify-center w-full h-full">
                                <div className="flex flex-col justify-center">
                                    {square ? <img className="w-10" src={`/${square?.color === "b" ? 
                                        square?.type : `${square?.type?.toUpperCase()} _`}.png`} /> :
                                        null }
                                </div>
                            </div>
                        </div>
                })
                }
            </div>
        })}
        </div>
    )
}