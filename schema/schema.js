const Joi = require('joi');

const studentSchema = Joi.object({
    studentId : Joi.number().min(4).required(),

    studentName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    qualification : Joi.string()
        .alphanum()
        .required(),

    studentEmail: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
        .required(),

    contactNumber : Joi.number().min(10).required(),

    isMentorAssigned : Joi.boolean(),

    oldMentorName : Joi.string().alphanum().min(3).max(30),

    newMentorName : Joi.string().alphanum().min(3).max(30),

    mentorName : Joi.string()
});

// let studentNameSchema = Joi.array().unique('studentName', { ignoreUndefined: true });

let studentKeys = Joi.object().keys({
    studentId : Joi.number().min(4),
    // studentEmail: Joi.string()
    //     .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
    //     .required(),
    studentName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        
        .required()
});

// const array_uniq_schema = Joi.array().unique((a, b) => a.studentName === b.studentName && a.studentId === b.studentId);

const mentorSchema = Joi.object({
    mentorId : Joi.number().min(4).required(),

    mentorName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    mentorEmail: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
        .required(),
    
    contactNumber : Joi.number().min(10).required(),

    students : Joi.array().unique('studentName', { ignoreUndefined: true })
})

module.exports = {studentSchema, mentorSchema};

// console.log(studentSchema.validate({ studentName: 'abc', qualification : 'btech' , studentEmail: 'abc@gmail.com' }));

// console.log(studentSchema.validate({}));

// Also -
// async function myFunc() {
    

// try {
//     // const value = await mentorSchema.validateAsync({ mentorId: 123,mentorName: 'abc',  mentorEmail: 'abc@ex.com', contactNumber : "152",students : [{studentName: 'abc' },{studentName: 'abc' }]});
//     const value = await studentSchema.validateAsync({ studentId: 123,studentName: 'abc',  studentEmail: 'abc@ex.com', contactNumber : "152", isMentorAssigned : false, qualification : 'btech',mentorName : '4'});
//     console.log(value)
// }
// catch (err) { console.log(err)}
// }
// myFunc();