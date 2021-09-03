import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import ReastaurantsDAO from "./dao/restaurantsDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

// load database before listening to a port
dotenv.config() // load config file 

const MongoClient = mongodb.MongoClient; // get mongoDB client
const port = process.env.PORT || 8000;  // getting port from environment variables

// below logic to connect to mngoDB and in case of success response start app on configured port
MongoClient.connect(process.env.RESTREVIEWS_DB_URI,{
            maxPoolSize:50,
            wtimeoutMS:2500,
            useNewUrlParser:true }
).catch(err => {
    console.log(err.stack);
    process.exit(1);
}).then(async client => {
    // passing mongoDB client to DAO layer
    await ReastaurantsDAO.injectDB(client);
    await ReviewsDAO.injectDB(client);
    // starting web server app on given port 
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})