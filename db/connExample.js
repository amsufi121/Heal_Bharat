const mongoose = require("mongoose");

const DB =
  "mongodb+srv://(username):(Password)@cluster0.avn7kvu.mongodb.net/(DB Name)?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(DB, {
    // userCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection start"))
  .catch((error) => console.log(error.message));
