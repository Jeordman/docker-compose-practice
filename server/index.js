require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const MongoManager = require("./mongo");
const PGManager = require("./postgres");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (_, res) => {
    res.send({
        icon: "😇",
        user: PGUSER,
        host: PGHOST,
        database: PGDATABASE,
        password: PGPASSWORD,
        port: PGPORT,
    });
});

MongoManager.init().then(() => {
    MongoManager.addStartingValuesToDb();
    app.get("/mongo/all", async (_, res) => {
        const result = await MongoManager.getAll();
        res.json(result);
    });

    app.post("/mongo", async (req, res) => {
        if (!req?.body?.name) res.send({ working: false });
        await MongoManager.add(req.body.name);
        res.send({ working: true });
    });
});

// the pg code is an example and is NOT disconnecting from the database
PGManager.connect().then(() => {
    app.get("/pg/all", async (_, res) => {
        const values = await PGManager.query("SELECT * FROM values");
        res.send(values.rows);
    });

    app.post("/pg", async (req, res) => {
        if (!req?.body?.number) res.send({ working: false });
        PGManager.query("INSERT INTO values(number) VALUES($1)", [
            req.body.number,
        ]);
        res.send({ working: true });
    });
});

app.listen(5000, () => console.log("Listening on port 5000"));
