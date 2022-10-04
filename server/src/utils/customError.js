module.exports = function customError(message, name) {
    const error = new Error(message);
    error.name = name;            
    return error;
}