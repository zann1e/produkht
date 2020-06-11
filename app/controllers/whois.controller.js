const whois = require('whois');
const metafetch = require('metafetch');
const db = require("../models");
const Domain = db.domains;

exports.get = (req, res) => Domain.exists({domain: req.params.id}, function (err, data) {

    console.log(data);
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
            if (data) {
                let meta = metafetch.fetch(req.params.id, function(err, metainfo) {
                    if (err) {
                        return console.error(err);
                    }
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
