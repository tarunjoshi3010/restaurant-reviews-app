import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let restaurant_collection

export default class ReastaurantsDAO{
    static async injectDB(client){
        if(restaurant_collection){
            return
        }
        try{
            restaurant_collection = await client.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        } catch(e) {
            console.log(`Unable to establish a collection handle in ReastaurantsDAO due to exception: ${e}`)
        }

    }

    static async getRestaurants({
        filters = null,
        page = 0,
        reastaurantsPerPage = 0
    }= {}) {
        let query 
        
        if(filters) {
            if("name" in filters) {
                query = { $text: {$search: filters["name"]}}
            } else if("cuisine" in filters) {
                query = { "cuisine": {$eq: filters["cuisine"]}}
            } else if("zipcode" in filters) {
                query = { "address.zipcode": {$eq: filters["zipcode"]}}
            }
        }

        let cursor

        try {
            cursor = await restaurant_collection.find(query)
        } catch(e) {
            console.log(`Unable to issue find command, ${e}`)
            return {restaurantsList: [], totalNumRestaurants: 0}
        }

        const displayCursor = cursor.limit(reastaurantsPerPage).skip(reastaurantsPerPage * page)
        try{
            const restaurantsList = await displayCursor.toArray()
            // another query to count documents/rows
            const totalNumRestaurants = await restaurant_collection.countDocuments(query)
            return {restaurantsList, totalNumRestaurants}
        } catch (e) {
            console.log(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return {restaurantsList: [], totalNumRestaurants: 0}
        }
    }


    static async getRestaurantsById(resturantId){

        try {
            const result = await restaurant_collection.findOne({_id: ObjectId(resturantId)})
            if(result) {
                console.log(`Found restaurants with id: ${resturantId} as below:`)
                return result
            } else {
                console.log(`No restaurant found with id: ${resturantId} as below:`)
            }
         } catch(e) {
            console.log(e)
        }
    }

    static async getRestaurantCusisines(){


        try {
            const cursor= await restaurant_collection.find({cuisines});

            const cuisines = cursor.toArray();

        } catch(e) {

        }
    }
}