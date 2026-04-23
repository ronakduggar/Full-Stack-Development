const express = require("express");

const { connectToMongoDB } = require("./connection");

const { logReqRes } = require("./middlewares");

const userRouter = require("./routes/user");

const app = express();
const PORT = 8001;

//Connection to MongoDB
connectToMongoDB("mongodb://localhost:27017/rest_api_2")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logReqRes("log.txt"));

//ROUTES
// app.get("/", (req, res) => res.send("API is running"));
app.get("/test", (req, res) => {
  res.send("API is running");
});
app.use(userRouter);

//Server Listening
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
