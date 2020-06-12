module.exports = app => {
    const whois = require("../controllers/whois.controller.js");

    let router = require("express").Router();

    // Get all whois records
    router.get("/", whois.index);

    // Retrieve a whois record
    router.get("/:id", whois.get);

    // Retrieve a whois record
    router.get("/sitemap/index", whois.sitemap);

    app.use('/', router);
};