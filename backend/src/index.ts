import express, {type Request, type Response} from "express"
import bodyparser from "body-parser"
import { Pool } from "pg"
import cors from "cors"

const app: express.Application = express()
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))


const PORT: number = 3000

const pool: Pool = new Pool({
    user: 'postgres',
    host: 'db',
    password: 'password'
})


//ROUTES

//Creates the table if it doesn't exist
app.get("/", async(req: Request, res: Response) => {
    await pool.query('CREATE TABLE IF NOT EXISTS cards (id VARCHAR(255) UNIQUE, clicks INT, firstclick BIGINT)')
    res.send("success")
})

//Inserts card from POST into table
app.post("/", async (req: Request, res: Response) => {
    let { num, click, time } = req.body;
    const response = await pool.query(`INSERT INTO cards (id, clicks, firstclick) VALUES (${num}, ${click}, ${time})`)
    res.send("success")
})

//Gets the number of rows in table
app.get("/cards", async(req: Request, res: Response) => {
    const response = await pool.query('SELECT COUNT(id) FROM cards')
    res.send(response.rows)
})

//Resets table
app.get("/reset", async(req: Request, res: Response) => {
    await pool.query('DELETE FROM cards')
    res.send("success")
})

//Gets cards sorted according to column in POST
app.post("/cards", async (req: Request, res: Response) => {
    let { col } = req.body;
    const response = await pool.query(`SELECT * FROM cards ORDER BY ${col}, id`)
    res.send(response.rows)
})

app.listen(PORT, () => {
    console.log(`Started on port: ${PORT}`)
})