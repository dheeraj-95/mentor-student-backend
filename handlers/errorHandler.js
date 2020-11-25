const errorHandler = (err, req, res, next) => {
    if(err)
        res.status(500).send('Something Broke Badly');
    next();
}

function logErrors (err, req, res, next) {
    console.error(err.stack)
    next(err)
}

module.exports = {errorHandler, logErrors};