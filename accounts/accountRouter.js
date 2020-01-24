const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router()


router.get("/",(req,res) => {
    db.select("*")
    .from("accounts")
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(err => {
        console.log(err,"Error in GET request to db");
        res.status(500).json({error: "There was an error getting all the accounts."})
    })
})



router.get("/:id",(req,res) => {
    const {id} = req.params;
    db("accounts")
    .where({id})
    .first()
    .then(account => {
        res.status(200).json(account)
    })
    .catch(err => {
        console.log(err,"Error in GET request by id of accounts.");
        res.status(404).json({error: "Error in getting account with specified id."})
    })
})

router.post("/", (req, res) => {
    const data = req.body;

   db("accounts")
        .insert(data, "id")
        .then(([id]) => {
            db("accounts")
            .where({id})
            .first()
            .then(account => {
                res.status(201).json(account)
            })
            .catch(err => {
                console.log(err, "Error with POST request to /accounts/");
                res.status(500).json({error: "There was a problem adding new account."})
            });
        });
})

router.put("/:id", (req,res) => {
    const changes = req.body;
    db("accounts")
        .where({id: req.params.id})
        .update(changes)
        .then(account => {
            res.status(200).json({message: `Successfully updated ${account} account records.`})
        })
        .catch(err => {
            console.log(err,"Error in PUT request to /accounts/:id");
            res.status(500).json({error: "There was a problem updating account."})
        });
})

router.delete("/:id", (req,res) => {
    db("accounts")
    .where({id: req.params.id})
    .del()
    .then(account => {
        res.status(200).json({message: `Successfully deleted ${account} account(s).`})
    })
    .catch(err => {
        console.log(err,"error with DELETE /accounts/:id");
        res.status(500).json({error: "Error cannot delete account with specified id."})
    });
})

module.exports = router;