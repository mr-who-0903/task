const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

dotenv.config({path: './config.env'});

// connecting with cloud db
require('./db/conn');

app.use(express.json());  // to recognise the incoming req obj as JSON obj

//  linking the router files to make our route easy
app.use(require('./router/auth'));

const port = process.env.PORT;

// // Routers
// app.get('/', (req, res) =>{
//     res.send("YOOO home page");
// })
// // app.get('/about', middleware, (req, res) =>{
// //     console.log('this is about console')
// //     res.send("about page");
// // })
// app.get('/contact', (req, res) =>{
//     res.send("contact us page");
// })
// app.get('/signin', (req, res) =>{
//     res.send("signin page");
// })
// app.get('/signup', (req, res) =>{
//     res.send("signup page");
// })

app.listen(port, () =>{
    console.log(`listening to port ${port}`)
})