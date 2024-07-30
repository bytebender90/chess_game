import {ChessConsole} from "../node_modules/chess-console/src/chess-console/ChessConsole.js"
import {LocalPlayer} from "../node_modules/chess-console/src/chess-console/players/LocalPlayer.js"
import {RandomPlayer} from "../node_modules/chess-console/src/chess-console/players/RandomPlayer.js"
import {Board} from "../node_modules/chess-console/src/chess-console/components/Board/Board.js"
import {GameStateOutput} from "../node_modules/chess-console/src/chess-console/components/GameStateOutput.js"
import {History} from "../node_modules/chess-console/src/chess-console/components/History.js"
import {CapturedPieces} from "../node_modules/chess-console/src/chess-console/components/CapturedPieces.js"
import {HistoryControl} from "../node_modules/chess-console/src/chess-console/components/HistoryControl.js"
import {GameControl} from "../node_modules/chess-console/src/chess-console/components/GameControl/GameControl.js"
import {Persistence} from "../node_modules/chess-console/src/chess-console/components/Persistence.js"
import {Sound} from "../node_modules/chess-console/src/chess-console/components/Sound.js"
import {StockFishPlayer} from "./StockFishPlayer.js"

const chessConsole = new ChessConsole(
    document.getElementById("console-container"),
    {name: "Local Player", type: LocalPlayer},
    {name: "StockFish Player", type: StockFishPlayer},
    {
        soundSpriteFile: "../node_modules/chess-console/assets/sounds/chess_console_sounds.mp3",
        chessboardSpriteFile: "../node_modules/chess-console/assets/images/chessboard-sprite.svg",
        savePrefix: "Random"
    }
)
chessConsole.addComponent(Board).then(() => {
    chessConsole.addComponent(Persistence)
        .then((component) => component.load())
})
chessConsole.addComponent(GameStateOutput)
chessConsole.addComponent(History)
chessConsole.addComponent(HistoryControl)
chessConsole.addComponent(CapturedPieces)
chessConsole.addComponent(GameControl)
chessConsole.addComponent(Sound)
