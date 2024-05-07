import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MAKE_MOVE } from "./message";

export class Game {
    public player1 : WebSocket
    public player2 : WebSocket
    private board : Chess
    private moves : String[]
    private startTime : Date
    private moveCount : number

    constructor(player1: WebSocket , player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.moves = [];
        this.moveCount = 0;
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: 'white'
        }))
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: 'black'
        }))
        
    }

    makeMove(socket : WebSocket , move : {
        from: string,
        to: string
    } | string) {

        if(this.moveCount % 2 === 0 && socket !== this.player1){
            return;
        }
        
        if(this.moveCount % 2 === 1 && socket !== this.player2){
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

        if(this.moveCount % 2 === 0){
            this.player2.send(JSON.stringify({
                type: MAKE_MOVE,
                payload: move
            }))
        } else {
            this.player1.send(JSON.stringify({
                type: MAKE_MOVE,
                payload: move
            }))
        }

        this.moveCount++
    }

}