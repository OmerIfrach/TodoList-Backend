const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const port = 5000;

const mongoose = require('mongoose')
const mongoUrl ='mongodb+srv://Omer_321:Omer_321@cluster0.cfk0s.mongodb.net/app?retryWrites=true&w=majority';
const Routes = require('./Routes/index')

app.use('*', cors(({ allowedHeaders: 'Content-Type,Accept,Access-Control-Allow-Origin' })));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Connected to mongo")
})

Routes(app)
app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});

