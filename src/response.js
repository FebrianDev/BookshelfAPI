function responseSuccess(status, message, code, h) {
    const response = h.response({
        status: status,
        message: message
    })

    response.code(code)
    return response

}

function responseFailed(status, message, code, h) {
    const response = h.response({
        status: status,
        message: message
    })
    response.code(code)
    return response
}

module.exports = {responseSuccess, responseFailed}