import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

if (!MONGODB_URI) {
    throw new Error('No MongoDb_URI')
}
if(!MONGODB_DB) {
    throw new Error('Define the MONGO_DB environmontal')
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDb() {
 // check the cached.
    if(cachedClient && cachedDb) {
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }
// set the connection options
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
// Connect to cluster
    let client = new MongoClient(MONGODB_URI, opts);
    await client.connect();
    let db = client.db(MONGODB_DB)

    cachedClient = client;
    cachedDb = db;
 // set cache
    return {
        client: cachedClient,
        db: cachedDb,
    }
}