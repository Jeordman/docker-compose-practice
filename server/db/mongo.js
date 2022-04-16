const { MONGO_URL, MONGO_DBNAME, MONGO_COLLECTION } = process.env;
// mongo ---

const { MongoClient } = require("mongodb");

const MONGO_OPTIONS = {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

class MongoManger {
    dbo;
    collection;

    init() {
        return new Promise(async (resolve, reject) => {
            try {
                let connectedMongoDB = await MongoClient.connect(
                    MONGO_URL,
                    MONGO_OPTIONS
                );
                this.dbo = connectedMongoDB.db(MONGO_DBNAME);
                this.collection = this.dbo.collection(MONGO_COLLECTION);
                return resolve();
            } catch (error) {
                console.log(error);
                return reject();
            }
        });
    }

    /**
     * if there is not a test collection in mongo insert it
     * */
    addStartingValuesToDb = () => {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await this.collection.findOne({
                    name: "test",
                });
                if (!result) {
                    this.collection.insertOne(
                        {
                            name: "test",
                        },
                        (err, result) => {
                            if (err) {
                                return reject(err);
                            }
                            return resolve(result);
                        }
                    );
                }
            } catch (error) {
                console.log(error);
                return reject();
            }
        });
    };

    getAll = () => {
        return new Promise((resolve, reject) => {
            try {
                this.collection.find().toArray((err, docs) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(docs);
                });
            } catch (error) {
                console.log(error);
                return reject(error);
            }
        });
    };

    add(name) {
        return new Promise((resolve, reject) => {
            try {
                this.collection.insertOne({ name }, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result);
                });
            } catch (error) {
                console.log(error);
                return reject(error);
            }
        });
    }
}

module.exports = new MongoManger();
