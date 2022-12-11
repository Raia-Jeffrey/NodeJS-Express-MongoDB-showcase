var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require("mongoose");
mongoose.connect(
    "mongodb://localhost:27017", { useNewUrlParser: true }
);
const db = mongoose.connection;

db.once("open", () => {
    console.log("connected to mongoDB through mongoose!");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Create Database and Schema's

const transactionSchema = mongoose.Schema({
    date: String,
    description: String,
    amount: Number,
    type: String

}, {
    timestamps: true
});

const transactionModel = mongoose.model("transactions", transactionSchema);

module.exports = {

    //Create new transactions for the user
    newTransactions: (req, res) => {
        let newTransaction = new transactionModel({
            date: req.body.date,
            description: req.body.description,
            amount: req.body.amount,
            type: req.body.type
        });
        newTransaction.save()
        res.send("Thanks for posting!");
    },

    //Read mongoDB database and display it to user
    getTransactions: (req, res) => {
        transactionModel.find()
            .exec()
            .then((transactions) => {
                res.json(transactions);
            })
            .catch((error) => {
                console.log(error.message);
                return [];
            })
            .then(() => {
                console.log("Promise complete.");
            });
    },

    //Update transactions to database
    updateTransactions: (req, res) => {
        let testId = { description: req.body.description };
        editedTransact = {
            date: req.body.date,
            description: req.body.description,
            amount: req.body.amount,
            type: req.body.type
        };
        transactionModel.findOneAndUpdate(testId, { $set: editedTransact }, { new: true })
            .then((newreciept) => {
                res.json(newreciept);
            })
            .catch((error) => {
                console.log(error.message);
                return
            })
            .then(() => {
                console.log("Promise complete!");
            });
    },

    //Delete transactions from the database
    removeTransactions: (req, res) => {
        let testId = { description: req.body.description };
        console.log(JSON.stringify(testId));
        transactionModel.deleteOne(testId)
            .then((newreciept) => {
                res.json(newreciept);
            })
            .catch((error) => {
                console.log(error.message);
                return
            })
            .then(() => {
                console.log("Promise complete!");
            });
    }
};

//C.R.U.D. functionality!