const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

const connectToMongoDB = async () => {
    mongoose.connect(DB_URL)
        .then(() => console.log("Connected to mongodb"))
        .catch((err) => console.error(err.message));
};

module.exports = connectToMongoDB