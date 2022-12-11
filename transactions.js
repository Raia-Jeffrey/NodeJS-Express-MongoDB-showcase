var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
transactionManager = require("TransactionManager");

router.get("/", transactionManager.getTransactions);

router.post("/", transactionManager.newTransactions);

router.put("/", transactionManager.updateTransactions);

router.delete("/", transactionManager.removeTransactions);

module.exports = router;