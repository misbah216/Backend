const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

function connectToDb() {
    return mongoose.connect(
        process.env.MONGO_URI
    )
    .then(() => {
        console.log("connected to Database");
    })
    .catch((err) => {
        console.error("Database connection error:", err);
        process.exit(1);
    });
}

module.exports = connectToDb;