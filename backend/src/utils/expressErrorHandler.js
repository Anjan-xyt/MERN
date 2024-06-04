const errorHandler = (err, req, res, next) => {
    return res.status(err.status||400).send(err.message||"you didn't pass error messege");
};

export default errorHandler;