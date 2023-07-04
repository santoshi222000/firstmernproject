const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const multer = require("multer")
const path = require("path")
const port = process.env.PORT;
const cors = require('cors')


const  course = require("./routes/route")
const  user = require("./routes/user");
const  content = require("./routes/content");
const {connection } = require('./database/db');
const errorHandler = require('./middleware/errorHandler');

// Middleware




connection();


app.use("/images", express.static(path.join(__dirname, "public/images")))

app.use(express.json());
app.use(cors())

app.use(errorHandler)


const storage = multer.diskStorage({
  destination: (req, file,cb)=>{
    cb(null, "public/images");
  },

  filename: (req, file, cb)=>{
    cb(null, req.body.name);
  }
})

const upload = multer(storage);
app.post("/api/upload",upload.single("file"), (req, res)=>{
  try {
    return res.status(200).json("File uploaded sucessfully")
  } catch (error) {
    console.log(error);
  }
})

app.use("/api/route",course );
app.use("/api/user",user );
app.use("/api/content",content );

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
