import RestaurantsDAO from "../dao/restaurantsDAO.js"

export default class RestaurantsController {

  static async apiGetRestaurants(req, res, next) {
    const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20 // 10 value is telling that its a decimal value and not hexadecimal
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({
                                                        filters,
                                                        page,
                                                        restaurantsPerPage,
                                                        })

    //forming proper response for client
    let response = {    restaurants: restaurantsList,
                        page: page,
                        filters: filters,
                        entries_per_page: restaurantsPerPage,
                        total_results: totalNumRestaurants
                      }

    //response back to api client
    res.json(response)
  }


  
  static async apiGetRestaurantById(req, res, next) {
      let resturant = await RestaurantsDAO.getRestaurantsById(req.params.id)
      res.json(resturant);
  }

  static async apiGetRestaurantCusisines(req, res, next) {

  }

}