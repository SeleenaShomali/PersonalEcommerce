//connect to db
//create basic server configuration
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors"); //Cross-Origin Resource Sharing”
const authRouter = require("./routes/auth/auth-routes");
// creat e adb connection
const app = express(); //webframework to handle HTTP requests and responses (implement ssever side logic)
const PORT = process.env.PORT || 5000; // the port that my backend server will run at
mongoose // NoSQL database system to store data in json form
  .connect("")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true, // login and regestriation
  })
); // things app is going to use

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log(`server is now running on port: ${PORT}`));
