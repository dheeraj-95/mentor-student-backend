const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const cors = require('cors');
const {errorHandler, logErrors} = require('./handlers/errorHandler');
const mentorRouter = require('./routers/mentorRouter');
const studentRouter = require('./routers/studentRouter');

app
    .use(bodyParser.json())
    .use(cors())
    .use('/api/mentor', mentorRouter)
    // .use('/api/getAllStudents/:mentorName', (req, res, next) => {
    //     req.mentorName = req.params.mentorName;
    //     next();
    // }, mentorRouter)
    .use('/api/student', studentRouter)
    .use(logErrors)
    .use(errorHandler)
    .listen(port);
