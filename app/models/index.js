const dbConfig = {
    url: "mongodb+srv://zann:554717@cluster0-hyk7r.gcp.mongodb.net/produkht?retryWrites=true&w=majority"
};
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.domains = require("./domain.model")(mongoose);

module.exports = db;