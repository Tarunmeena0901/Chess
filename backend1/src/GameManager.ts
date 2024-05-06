import { WebSocket } from "ws";

export class GameManager {
    private games: Game[]
    private users: WebSocket[]
    private pendingUsers: WebSocket

    constructor() {
        this.games = [];
        this.users = []''
    }

    addUser(socket: WebSocket) {
        this.users.push(socket)
    }

    removeUser(socket: WebSocket) {
        this.users = this.users.filter( user => user !== socket)
    }
}