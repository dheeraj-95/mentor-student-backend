const express = require('express');
const mentorRouter = express.Router();
const {mentorSchema} = require('../schema/schema');
const MongoClient = require('mongodb').MongoClient;
const url = require('../config/config');

mentorRouter
    .post('/createMentor', async (req,res) => {
        try{
            await mentorSchema.validateAsync(JSON.parse(JSON.stringify(req.body)));
            const client = await MongoClient.connect(url,{ useUnifiedTopology: true });
            let db = client.db("mentor-student")
            let ifExists = await db.collection('mentors').findOne({"mentorId" : req.body.mentorId});
            if(ifExists){
                // console.log(ifExists);
                res.status(400).json({status :`Mentor with ${req.body.mentorId} already exists. Please provide a unique Id`});
            }else {
                await db.collection('mentors').insertOne({
                    mentorId : req.body.mentorId,
                    mentorName : req.body.mentorName,
                    mentorEmail : req.body.mentorEmail,
                    contactNumber : req.body.contactNumber,
                    students : []
                });
                
                res.status(201).json({status : `Mentor ${req.body.mentorName} Created Successfully`});
                client.close()
            }
        }catch(err) {    
            res.status(422).json({status : `${err}`});
            console.log(err);
        }
    })
    .post('/assignStudent', async (req, res) => {
        try{
            const client = await MongoClient.connect(url,{ useUnifiedTopology: true });
            let db = client.db("mentor-student")
            // let find = await db.collection('mentors').findOne({mentorName : req.body.mentorName}, {$push : {students : req.body.studentName}});
            let find = await db.collection('mentors').findOne( {students : req.body.studentName})
            // console.log(find);
            if(!find){
                await db.collection('mentors').findOneAndUpdate({mentorName : req.body.mentorName}, {$push : {students : req.body.studentName}})
                await db.collection('students').findOneAndUpdate({studentName : req.body.studentName}, {$set : {isMentorAssigned : true}})
                await db.collection('students').findOneAndUpdate({studentName : req.body.studentName}, {$set : {mentorName : req.body.mentorName}})
                res.send('Details updated successfully');
            }else {
                res.status(422).json({status : `${req.body.studentName} already assigned with a mentor`});
            }
            client.close()
        }catch(err) {
            res.status(422).json({status : `${err}`});
            console.log(err);
        }
    })
    .put('/updateMentor', async (req, res) => {
        try{
            const client = await MongoClient.connect(url,{ useUnifiedTopology: true });
            let db = client.db("mentor-student")
            // const result = await mentorSchema.validateAsync(JSON.parse(JSON.stringify(req.body)));
            let oldMentorFind = await db.collection('mentors').findOne( {mentorName : req.body.oldMentorName})
            let newMentorFind = await db.collection('mentors').findOne( {mentorName : req.body.newMentorName})
            if(oldMentorFind && newMentorFind) {

                await db.collection('mentors').findOneAndUpdate({mentorName : req.body.oldMentorName},{$pull : {students : req.body.studentName}})
                await db.collection('mentors').findOneAndUpdate({mentorName : req.body.newMentorName},{$push : {students : req.body.studentName}})
                await db.collection('students').findOneAndUpdate({studentName : req.body.studentName}, {$set : {isMentorAssigned : true}})
                await db.collection('students').findOneAndUpdate({studentName : req.body.studentName}, {$set : {mentorName : req.body.newMentorName}})
                res.status(200).json({status : 'Mentor Changed successfully'});
                
            }else {
                res.status(400).json({status : 'Mentor name is not registered, Please check the mentor name'});
            }

            client.close()
        }catch(err){
            res.status(422).json({status : `${err}`});
            console.log(err);
        }
    })
    .get('/', async (req,res) => {
        try{
            const client = await MongoClient.connect(url,{ useUnifiedTopology: true });
            let db = client.db("mentor-student");
            let mentors = await db.collection('mentors').find().toArray();
            res.status(200).json(mentors);
            client.close()
        }catch(err){
            res.status(422).json({status : `${err}`});
            console.log(err);
        }
    })

module.exports = mentorRouter;