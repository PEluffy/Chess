import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./Message";
import { Game } from "./Game";
import { User } from "./User";

export class GameManager {
  private games: Game[];
  private pendingUser: WebSocket | null;
  private users: WebSocket[];

  constructor() {
    this.games = [];
    this.pendingUser = null;
    this.users = [];
  }
  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.addHandler(socket);
  }
  removeUser(socket: WebSocket) {
    this.users = this.users.filter((user) => user !== socket);
    //stop the game
  }
  private addHandler(socket: WebSocket) {
    //handle message
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());
      if (message.type === INIT_GAME) {
        if (this.pendingUser) {
          //start game
          const game = new Game(this.pendingUser, socket);
          this.games.push(game);
          this.pendingUser = null;
        } else {
          this.pendingUser = socket;
        }
      }
      if (message.type === MOVE) {
      }
    });
  }
}
