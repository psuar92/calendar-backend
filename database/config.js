const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CONNECTION);

        console.log('Database online');
    } catch (error) {
        console.log(error);
        throw new Error('Error at database initialization');
    }
}

module.exports = {
    dbConnection
}