const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('[app]: Mongo DB Connected...');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDb;
