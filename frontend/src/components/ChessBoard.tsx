import { Color, PieceSymbol, Square } from "chess.js";

export const ChessBoard = ({board, socket}: {
    board : ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][] ,
    socket: WebSocket
})=> {
    return (
        <div>
        {board.map((row,i) => {
            return <div key={i} className="flex">
                {row.map((square, j) => {
                    return <div key={j} className={`w-16 h-16 ${(i+j)%2 === 0 ? 'bg-green-600' : 
                        'bg-yellow-50'}`}>
                            <div className="flex justify-center w-full h-full">
                                <div className="flex flex-col justify-center">
                                    {square ? square.type : ""}
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