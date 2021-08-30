import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import ReastaurantsDAO from "./dao/restaurantsDAO.js";

dotenv.config()
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        maxPoolSize:50,
        wtimeoutMS:2500,
        useNewUrlParser:true
    }
).catch(err => {
    console.log(err.stack);
    process.exit();
}).then(async client => {
    await ReastaurantsDAO.injectDB(client);

    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})