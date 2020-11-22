const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

const mentorRouter = require('./routers/mentorRouter');
const studentRouter = require('./routers/studentRouter');


app
    .use(bodyParser.json())
    .use(express.static('public'))
    .use('/api/createMentor', mentorRouter)
    .use('/api/assignStudent/:mentorName', (req, res, next) => {
        req.mentorName = req.params.mentorName;
        next();
    } , mentorRouter)
    .use('/api/getAllStudents/:mentorName', (req, res, next) => {
        req.mentorName = req.params.mentorName;
        next();
    }, mentorRouter)
    .use('/api/createStudent', studentRouter)
    .listen(port);
