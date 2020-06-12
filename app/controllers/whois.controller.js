const whois = require('whois');
const metafetch = require('metafetch');
const db = require("../models");
const Domain = db.domains;
const notfound = new RegExp(/(queried object does not exist)|(No match)|(No entries found)|(No Object Found)|(No Data Found)|(not found.)|(NOT FOUND)/);

exports.get = (req, res) => Domain.exists({domain: req.params.id}, function (err, data) {

    console.log(req.params.id, data);
    if (data) {
        Domain.findOne({domain: req.params.id})
            .then(data => {
                res.render('page', {data: data});
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving domain."
                });
            });
    }
    else {
        // Create a Tutorial
        whois.lookup(req.params.id, function (err, data) {
            console.log(req.params.id, data);
            if (data) {
                let noDomain = data.search(notfound);
                console.log(noDomain);
                if (noDomain !== -1) {res.render('nodomain', {data: data, domain: req.params.id}); return; }
                let meta = metafetch.fetch(req.params.id, function(err, metainfo) {
                    let domain = new Domain({
                        domain: req.params.id,
                        whois: data,
                        meta: metainfo,
                    });
                    domain.save(domain)
                        .then(data => {
                            res.render('page', {data: data});
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while saving the Domain."
                            });
                        });
                });

            }

        });

    }

});

exports.index = (req, res) => {

    Domain.find().limit(20).sort({createdAt:-1})
        .then(data => {
            res.render('index', {data: data});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.sitemap = (req, res) => {

    Domain.find().limit(50000).sort({createdAt:-1})
        .then(data => {
            res.render('sitemap', {data: data});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};
