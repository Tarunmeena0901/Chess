import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, MAKE_MOVE } from "./message";

export class Game {
    public player1 : WebSocket
    public player2 : WebSocket
    private board : Chess
    private moves : String[]
    private startTime : Date

    constructor(player1: WebSocket , player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.moves = [];
        this.startTime = new Date();
    }

    makeMove(socket : WebSocket , move : {
        from: string,
        to: string
    } | string) {

        if(this.board.moves.length % 2 === 0 && socket !== this.player1){
            return;
        }
        
        if(this.board.moves.length % 2 === 1 && socket !== this.player2){
            return;
        }

        try {
            this.board.move(move);
        } catch (error) {
            console.log(error);
            return;
        }

        if(this.board.isGameOver()){
            this.player1.emit(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner : this.board.turn() === 'w' ? 'black' : 'white'
                }
            }))
        }

        if(this.board.moves.length % 2 === 0){
            this.player2.emit(JSON.stringify({
                type: MAKE_MOVE,
                payload: move
            }))
        } else {
            this.player2.emit(JSON.stringify({
                type: MAKE_MOVE,
                payload: move
            }))
        }
    }

}