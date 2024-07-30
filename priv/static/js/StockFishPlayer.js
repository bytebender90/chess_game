import {ChessConsolePlayer} from "../node_modules/chess-console/src/chess-console/ChessConsolePlayer.js"

export class StockFishPlayer extends ChessConsolePlayer {

    constructor(name, chessConsole, props) {
        super(name, chessConsole, props)
    }

    moveRequest(fen, moveResponse) {
        $.ajax({
          url: "/api/bot",
          type: "POST",
          dataType: "json",
          data: { fen },
          success: function (move) {
            moveResponse(move)
          }
        });
    }
}