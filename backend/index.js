const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 8081;
const jwt_secret = process.env.JWT_SECRET;
// const connectionURL = process.env.CONNECTION_URL;
const connectionURL = "mongodb://localhost:27017/yogadb";
app.use(cors())
app.use(bodyParser.json());


// swagger doc gen initialized

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Authentication APIs',
        version: '1.0.0',
      },
      server: ['http://localhost:5000']
    },
    apis: ['./routes/*.js','./index.js'], // files containing annotations as above
  };

const swaggerDocs = swaggerJsdoc(options);
app.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/',(req, res) => {
  // res.status(200).send('<h3>View Apis doc: /docs</h3>');
  res.redirect('/docs');
})

mongoose.connect(connectionURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}).then(()=>console.log('conneted to db'))
  .catch((err)=>console.log(err))


// Api Endpoints
 /**
   * @swagger
   * /test:
   *   get:
   *     description: testing api
   *     responses:
   *       200:
   *         description: yes! server is running
   */
app.get('/test',(req, res) => {
    res.status(200).send('yes! server is running');
})
require('./routes')(app)

app.listen(port,()=>{
    console.log(`server is started on localhost:${port}`);
});
