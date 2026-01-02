const responseSuccess = (res, message = 'Success') => {
    return res.status(200).json({ 
        success : true,
        message
    });
}

const responseError = (res, message = 'Error') => {
    return res.status(400).json({ 
        success : false,
        message
    });
}

export default { responseSuccess, responseError };