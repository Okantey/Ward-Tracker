import express from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
dotenv.config()
const PORT = process.env.PORT || 8000
const app = express()


app.use("/api/users", userRoutes)
app.get("/", (request, response) => {
  response.status(200).json({ message: "Server is up and running!" })
})
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})