const express = require("express");
const app = express();
// to use middleware function json
app.use(express.json());
//to use middleware function urlencode
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
//To provide access to cross origins added port 5500
var corsOptions = {
  origin: "http://127.0.0.1:5500",
};

app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.render("server running succussefully");
});

//Import of database configuration
const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
  
require("./routes/users.routes.js")(app);
app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
