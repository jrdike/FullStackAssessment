import express, {type Request, type Response} from "express"

const app: express.Application = express()
const PORT: number = 3000

app.get("/", (req: Request, res: Response) => {
    res.send('test')
})

app.listen(PORT, () => {
    console.log(`Started on port ${PORT}`)
})