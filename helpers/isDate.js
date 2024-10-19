const { isValid } = require('date-fns');

const isDate = (value) => {

    if(!value) return false;

    const date = isValid(value);

    return date;
}

module.exports = {
    isDate
}