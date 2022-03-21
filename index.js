require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const contactRoute = require("./routes/contactRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRouter");
const cephalopodRouter = require("./routes/cephalopodRouter");
const coralRouter = require("./routes/coralRouter");
const mammalRouter = require("./routes/mammalRouter");
const ecosystemRouter = require("./routes/ecosystemRouter");
const reptileRouter = require("./routes/reptileRouter");
const fishRouter = require("./routes/fishRouter");
const seabirdRouter = require("./routes/seabirdRouter");
const sharkRouter = require("./routes/sharkRouter");
// Setting up MongoDB connection
mongoose.connect(process.env.DBURL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

app.use(cors());
app.use(express.json());

// API routes
app.get("/", (req, res, next) => {
  res.send(`
  <style>

  body {
    -webkit-animation: bg-pan-left 2s linear infinite alternate both; 
    animation: bg-pan-left 2s linear infinite alternate both;
  }
  @-webkit-keyframes bg-pan-left {
    0% {
      background: #19dcea;
    }
    100% {
      background: white;
    }
  }
  @keyframes bg-pan-left {
    0% {
      background: #19dcea;
    }
    100% {
      background: white;
    }
  }
  
  .section1{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .head{
  text-align:center;
  }
  </style>

  <section class="section2">
  <h1 class="head">Welcome to Abduls Marine Encyclopedoa Api</h1>
  <h3 class="head"><a href="http://marine-encyclopedia.web.app/" target="_blank">marine-encyclopedia.web.app</a></h3>
  <h1 class="head">RELEVANT ROUTES</h1>
  </section>
  <section class="section1">
 
  <div class="routes">
  <h2>GET '/users' :</h2>
  <p>Gets all the users via <a href="http://mullins-marine-api.herokuapp.com/users" target="_blank">link</a></p>
  <br>
  <h2>GET '/users/oneuser" :</h2>
  <p>Gets a single user via <a href="https://mullins-marine-api.herokuapp.com/users/oneuser" target="_blank">link</a> IF LOGGED IN, using JWT TOKEN</p>

  <br>
  <h2>POST '/users' :</h2>
  <p>Registers the users via <a href="http://mullins-marine-api.herokuapp.com/users" target="_blank">link</a>.</p>
  <p>req.body info needed: <span class="userpost">email , password, phone_number, street, city, zipcode, country</span></p>
  <br>
  <h2>PUT '/users' :</h2>
  <p>Edits the users via <a href="http://mullins-marine-api.herokuapp.com/users" target="_blank">link</a> if logged in.</p>
  <p>req.body info needed: <span class="userpost">email , password, phone_number, street, city, zipcode, country</span></p>
  <br>
  <h2>PATCH '/users' :</h2>
  <p>Logs in the user using this <a href="http://mullins-marine-api.herokuapp.com/users" target="_blank">link</a></p>

  <h2>DELETE '/users' :</h2>
  <p>DELETES user WHEN LOGGED IN </p>

  <h2>GET '/product' :</h2>
  <p>Gets all the products via <a href="http://mullins-marine-api.herokuapp.com/product" target="_blank">link</a></p>
  <br>
  <h2>GET '/product/:id" :</h2>
  <p>Gets a single product </p>

  <br>
  <h2>POST '/product/:id' :</h2>
  <p>Creates a product via <a href="http://mullins-marine-api.herokuapp.com/product" target="_blank">link</a>.</p>
  <p>req.body info needed: <span class="userpost">title , category, description, img, price</span></p>
  <br>

  <h2>DELETE '/product/id' :</h2>
  <p>DELETES the product IF you are the creator of the product </p>
  </div>
  </section>`);
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
