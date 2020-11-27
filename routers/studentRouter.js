const express = require('express');
const studentRouter = express.Router();
const {studentSchema} = require('../schema/schema');
const MongoClient = require('mongodb').MongoClient;
// const mongoClient = mongodb.MongoClient;
const url = require('../config/config');
// console.log(url)
studentRouter
    .post('/createStudent', async (req,res) => {
        try{
            await studentSchema.validateAsync(JSON.parse(JSON.stringify(req.body)));
            const client = await MongoClient.connect(url,{ useUnifiedTopology: true });
            let db = client.db("mentor-student")
            // console.log(client)
            let ifExists = await db.collection('students').findOne({"studentId" : req.body.studentId});
            let ifNameExists = await db.collection('students').findOne({"studentName" : req.body.studentName});
            if(ifExists || ifNameExists){
                // console.log(ifExists);
                res.status(400).json({status : `Student with either ${req.body.studentId} or ${req.body.studentName} already exists. Please provide unique details`});
            }
            else {

                await db.collection('students').insertOne({
                    studentId : req.body.studentId,
                    studentName : req.body.studentName,
                    qualification : req.body.qualification,
                    studentEmail : req.body.studentEmail,
                    contactNumber : req.body.contactNumber,
                    isMentorAssigned : false,
                    mentorName : 'NA'
                });
                res.status(201).json({status : `Student ${req.body.studentName} Created Successfully`});
                client.close()
            }
        }catch(err) {    
            res.status(422).json({status : `${err}`});
        }
        
    })
    .get('/', async (req, res) => {
        try{
            const client = await MongoClient.connect(url, { useUnifiedTopology: true });
            let db = client.db("mentor-student");
            let students = await db.collection('students').find().toArray();
            res.status(200).json(students);
            client.close()
        }catch(err){
            res.status(422).json({status : `${err}`});
        }
    })

module.exports = studentRouter;