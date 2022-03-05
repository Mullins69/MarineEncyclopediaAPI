require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const contactRoute = require("./routes/contactAPI");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter")
const encyclopediaRouter = require("./routes/encyclopediaRouter")
// Setting up MongoDB connection
mongoose.connect(process.env.DBURL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

app.use(cors());
app.use(express.json());

// API routes
app.get("/", (req, res, next) => {
  res.send({
    message: "Welcome to Abduls Marine Encyclopedia API",
  });
});
app.use("/users", userRouter);
app.use("/product", productRouter);
app.use("/contact", contactRoute);
app.use("/encyclopedia", encyclopediaRouter);

app.set("port", process.env.PORT || 6969);
app.listen(app.get("port"), (server) => {
  console.info(`Server listen on port ${app.get("port")}`);
});

