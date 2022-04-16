const { Client } = require('pg');

const { PGUSER, PGHOST, PGDATABASE, PGPASSWORD, PGPORT } = process.env;

class Postgres {

    client;

    constructor() {
        this.client = new Client({
            user: PGUSER,
            host: PGHOST,
            database: PGDATABASE,
            password: PGPASSWORD,
            port: PGPORT,
        });
    }

    async connect() {
        await this.client.connect();
        this.client.query("CREATE TABLE IF NOT EXISTS values (number INT)")
        .catch((err) => console.log(err));

    }

    async close() {
        await this.client.end();
    }

    async query(query, values) {
        return await this.client.query(query, values);
    }
}

module.exports = new Postgres();
