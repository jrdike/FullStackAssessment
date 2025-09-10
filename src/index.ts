import express, {type Request, type Response} from "express"
import bodyparser from "body-parser"
import { Pool } from "pg"

const app: express.Application = express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))


const PORT: number = 3000

const pool: Pool = new Pool({
    user: 'postgres',
    host: 'db',
    password: 'password'
})

app.get("/", async(req: Request, res: Response) => {
    await pool.query('CREATE TABLE IF NOT EXISTS cards (id VARCHAR(255) UNIQUE, clicks INT, firstclick BIGINT)')
    res.send("success")
})

app.post("/", async (req: Request, res: Response) => {
    let { num, click, time } = req.body;
    const response = await pool.query(`INSERT INTO cards (id, clicks, firstclick) VALUES (${num}, ${click}, ${time})`)
    res.send("success")
})

app.get("/", async (req: Request, res: Response) => {
    const response = await pool.query('SELECT * FROM cards')
    res.send(response.rows)
})

app.listen(PORT, () => {
    console.log(`Started on port: ${PORT}`)
})