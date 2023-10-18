import express from "express"
import dotenv from "dotenv"
dotenv.config()
const PORT = process.env.PORT || 8000


const app = express()
app.get("/", (request, response) => {
  response.status(200).json({ message: "Server is up and running!" })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})