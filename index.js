require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const contactRoute = require("./routes/contactRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter")
const cartRouter = require("./routes/cartRouter")
const cephalopodRouter = require("./routes/cephalopodRouter")
const coralRouter = require("./routes/coralRouter")
const mammalRouter = require("./routes/mammalRouter")
const ecosystemRouter = require("./routes/ecosystemRouter")
const reptileRouter = require("./routes/reptileRouter")
const fishRouter = require("./routes/fishRouter")
const seabirdRouter = require("./routes/seabirdRouter")
const sharkRouter = require("./routes/sharkRouter")
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
app.use("/cart", cartRouter);
app.use("/contact", contactRoute);
app.use("/cephalopod", cephalopodRouter);
app.use("/coral", coralRouter);
app.use("/mammal", mammalRouter);
app.use("/ecosystem", ecosystemRouter);
app.use("/reptile", reptileRouter);
app.use("/fish", fishRouter);
app.use("/seabird", seabirdRouter);
app.use("/shark", sharkRouter);

app.set("port", process.env.PORT || 6969);
app.listen(app.get("port"), (server) => {
  console.info(`Server listen on port ${app.get("port")}`);
});

