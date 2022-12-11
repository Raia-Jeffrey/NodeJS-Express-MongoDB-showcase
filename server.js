const port = 3000;
express = require("express");
var bodyParser = require('body-parser');
transactionRouter = require("../routes/transactions");
httpStatus = require("http-status-codes");
fs = require("fs");
app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
htmlContentType = {
    "Content-Type": "text/html"
};

customReadFile = (file, res) => {
    fs.readFile(`./${file}`, (error, data) => {
        if (error) {
            console.log("Error Reading the file...");
        }
        res.end(data);
    });
};

app.get("/index.html", (req, res) => {
    res.writeHead(200, htmlContentType);
    customReadFile("index.html", res);
})

app.use("/transaction", transactionRouter);

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);