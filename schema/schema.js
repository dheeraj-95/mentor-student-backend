const Joi = require('joi');

const studentSchema = Joi.object({
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
        .required()
});

const mentorSchema = Joi.object({
    mentorName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    mentorEmail: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
        .required()
})

module.exports = {studentSchema, mentorSchema};

// console.log(studentSchema.validate({ studentName: 'abc', qualification : 'btech' , studentEmail: 'abc@gmail.com' }));

// console.log(studentSchema.validate({}));

// Also -
// async function myFunc() {
    

// try {
//     const value = await studentSchema.validateAsync({ studentName: 'abc', qualification : 'btech' , studentEmail: 'abc@ex.com' });
//     console.log(value)
// }
// catch (err) { console.log(err)}
// }
// myFunc();