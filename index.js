/**
 * Module dependencies
 */
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
/**
 * Route file import
 */
const route = require('./route/route');
/** 
 * Mongodb connections
 * */
mongoose.connect("mongodb://localhost:27017/E-Comerce", { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then((res) => {
        console.log("**************************Connected with mongodb************************************");
    }).catch((error) => {
        console.log("Database connection Error ", error);
    });

/**
 * Middleware
 * */ 
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false,limit: '50mb' }));
app.use(morgan('dev'));
app.use(cors());

/**
 * Routes file here
 */
app.use('/', route);

/**
 * Server listner
 */
app.listen(4321, console.log('Server listen http://localhost:4321'))