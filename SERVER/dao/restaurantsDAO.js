let restaurants

export default class ReastaurantsDAO{
    static async injectDB(conn){
        if(restaurants){
            return
        }

        try{
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
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
            cursor = await restaurants.find(query)
        } catch(e) {
            console.log(`Unable to issue find command, ${e}`)
            return {restaurantsList: [], totalNumRestaurants: 0}
        }

        const displayCursor = cursor.limit(reastaurantsPerPage).skip(reastaurantsPerPage * page)
        try{
        const restaurantsList = await displayCursor.toArray()
        const totalNumRestaurants = await restaurants.countDocuments(query)

        return {restaurantsList, totalNumRestaurants}
        } catch (e) {
            console.log(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return {restaurantsList: [], totalNumRestaurants: 0}
        }
    }
}