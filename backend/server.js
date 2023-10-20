import express, { json } from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import connectDB from "./config/db.js"
import cookieParser from 'cookie-parser';
dotenv.config()
const PORT = process.env.PORT || 8000

connectDB()
const app = express()

app.use(json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use("/api/users", userRoutes)
app.get("/", (request, response) => {
  response.status(200).json({ message: "Server is up and running!" })
})
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})