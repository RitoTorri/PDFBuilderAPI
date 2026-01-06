const responseSuccess = (res, message = 'Success', data = null) => {
    return res.status(200).json({ 
        success : true, message, data
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

const responsePdf = (res, pdfBuffer) => {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="reporte.pdf"');
    res.send(pdfBuffer);
}

export default { responseSuccess, responseError, responseErrorInternal, responseNotFound, responsePdf };