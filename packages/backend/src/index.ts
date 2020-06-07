import express from "express"
import {join} from "path"

const app = express();

app.use(express.static(join(__dirname, './frontend')));
app.use(express.json());

const port = 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));