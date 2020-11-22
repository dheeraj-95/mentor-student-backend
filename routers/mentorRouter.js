const express = require('express');
const mentorRouter = express.Router();

mentorRouter
    .post('/',(req,res) => {

    })
    .get('/', (req, res) => {
        console.log(req.mentorName);
    })

module.exports = mentorRouter;