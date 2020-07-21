import express from "express"
import { join } from "path"
import { Game } from "@nothing-but-js/api";

const app = express();

app.use(express.static(join(__dirname, './frontend')));
app.use(express.json());

app.post("/api/game/hit", (req, res) => {
    let game: Game = req.body;
    game = {
        ...game,
        playerScore: game.playerScore + Math.ceil(Math.random() * 11)
    }
    if(gameIsOver(game)){
        game = calculateResult(game);
    }
    res.send(game);
})

app.post("/api/game/stand", (req, res) => {
    let game: Game = req.body;
    while(game.dealerScore <= 17){
        game = {
            ...game,
            dealerScore: game.dealerScore + Math.ceil(Math.random() * 11)
        }
    }
    res.send(calculateResult(game))
})

function calculateResult(game: Game) {
    if(youWon(game)){
        return {
            ...game,
            message: "You Win!",
            messageStyle: {color: "green"}
        }
    }else{
        return {
            ...game,
            message: "You Lose!",
            messageStyle: {color: "red"}
        }
    }
}

function gameIsOver(gameToCheck: Game) {
    return gameToCheck.playerScore >= 21;
}

function youWon(gameToAnalyze: Game) {
    return gameToAnalyze.dealerScore > 21
        || gameToAnalyze.playerScore > gameToAnalyze.dealerScore
        && gameToAnalyze.playerScore <= 21;
}

const port = 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));