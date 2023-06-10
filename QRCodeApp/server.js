//Importing Modules
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require("path");
const qrcode = require('qrcode');
//Creating an Express Application
const app = express();
//Setting Up Configuration
const port = process.env.port || 4000;
// Set up the MongoDB connection
const uri = "mongodb://localhost:27017";
async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("Connected to MongoDB"); 
    }catch (error){
        console.error(error);
    }
}
connect();
// Configuration 
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use(express.json())
app.use(express.urlencoded({extended: false }));

// setting the template engine
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'view'));
app.use(express.static('public'));

//route for the homepage
app.get('/', (req, res, next) => {
    res.render('index')
});
//route for generating QR codes
app.post('/scan',(req, res, next) => {
    const input_text = req.body.text;
    console.log(input_text);
    qrcode.toDataURL(input_text,(err, src) => {
        res.render("scan", {
            qr_code: src,
        });
    });
});
//listening to the port
app.listen(port, console.log(`Listening on port 4000`));
