import express from "express";
import dotenv from "dotenv";
import connection from "./db/conn.js";
import cors from "cors";
import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js";
import userRoute from "./routes/user.js";
import searchRoute from "./routes/search.js";
//Fetching dotenv file
dotenv.config({ path: "./config.env" });

//App router
const app = express();

//Assigning port
const PORT = process.env.PORT;

//Database
connection();

//Middlewares

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/search", searchRoute);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

//Test port
app.get("/", (req, res) => {
  res.send("Test Route");
});

//Listening Port
app.listen(PORT, () => {
  console.log(`Server is up on PORT: ${PORT}`);
});
