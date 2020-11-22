const express = require('express');
const studentRouter = express.Router();
const {studentSchema} = require('../schema/schema');

const students = [];

studentRouter
    .post('/', async (req,res) => {
        try{
            const result = await studentSchema.validateAsync(JSON.parse(JSON.stringify(req.body)));
            // console.log(result);
            const studentData = {
                studentId : students.length + 1,
                studentName : req.studentName,
                qualification : req.qualification,
                studentEmail : req.studentEmail
            }
            students.push(studentData )
            res.status(201).json({status : `Student ${req.body.studentName} Created Successfully`});

        }catch(err) {
            if(err.isJoi === true) 
                res.status(422).json({status : `${err}`});
        }
        
    })
    .get('/', (req, res) => {
        
    })

module.exports = studentRouter;