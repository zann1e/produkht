module.exports = app => {
    const whois = require("../controllers/whois.controller.js");

    let router = require("express").Router();

    app.get('/*', function(req, res, next) {
        if (req.headers.host.match(/^www/) !== null ) {
            res.redirect(req.protocol + req.headers.host.replace(/^www\./, '') + req.url);
        } else {
            next();
        }
    })

    // Get all whois records
    router.get("/", whois.index);

    // Retrieve a whois record
    router.get("/:id", whois.get);

    // Retrieve a whois record
    router.get("/sitemap/index", whois.sitemap);

    app.use('/', router);
};