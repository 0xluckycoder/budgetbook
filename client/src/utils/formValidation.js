// if want to skip just pass false as an argument
const validateMin = (min, value) => {
    if (min) {
        // validate min value
        if (value.length !== 0 && value.length < min) {
            return {
                error: true
            }
        } else {
            return {
                error: false
            };
        } 
    }
}

const validateMax = (max, value) => {
    if (max) {
        // validate max value
        if (value && value.length > max) {
            return {
                error: true
            }
        } else {
            return {
                error: false
            };
        }
    }
}

const validateRequired = (value) => {
    if (value === "" || value === undefined) {
        return {
            error: true
        }
    } else {
        return {
            error: false
        }
    }
}

const validateEmail = (value) => {
    if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return {
            error: true
        }
    } else {
        return {
            error: false
        }
    }
}

export {
    validateMin,
    validateMax,
    validateRequired,
    validateEmail
}