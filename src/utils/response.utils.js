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

const responseErrorInternal = (res, message = 'Error') => {
    return res.status(500).json({ 
        success : false,
        message
    });
}

const responseNotFound = (res, message = 'Error') => {
    return res.status(404).json({ 
        success : false,
        message
    });
}

export default { responseSuccess, responseError, responseErrorInternal, responseNotFound };