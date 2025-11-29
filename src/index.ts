import 'dotenv/config'
import express from 'express'
import connectToDB from './utils/database'
import adminRoutes from './routes/adminRoutes'
import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT || 3030

app.use(bodyParser.json())

connectToDB()

app.get('/', (req, res) => {
    res.send('hello world!')
})

app.use('/api/admin/', adminRoutes)

app.listen(port, () => {
    console.log(`Server running in htttp://localhost:${port}`)
})


// zod untuk validasi data atau schema api