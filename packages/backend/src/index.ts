import express from "express"
import {join} from "path"
import { Game } from "@nothing-but-js/api";

const app = express();

app.use(express.static(join(__dirname, './frontend')));
app.use(express.json());

app.post("/api/game/hit", (req, res) => {
    let game: Game = req.body;
    res.send({
        ...game,
        playerScore: game.playerScore + Math.ceil(Math.random() * 11)
    });
})

app.post("/api/game/stand", (req, res) => {
    let game: Game = req.body;
    while(game.dealerScore <= 17){
        game = {
            ...game,
            dealerScore: game.dealerScore + Math.ceil(Math.random() * 11)
        }
    }
    res.send(game)
})

const port = 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));