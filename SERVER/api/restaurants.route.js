import express from "express";
import ReastaurantsCtrl from "../api/restaurants.controller.js";
import ReviewsCtrl from "../api/reviews.controller.js";

// access express router
const router = express.Router();

// get all restaurants reviews
//router.route("/").get((re,res) => res.send("Hello World!!!") );  // testing code
router.route("/").get(ReastaurantsCtrl.apiGetRestaurants);
router.route("/id/:id").get(ReastaurantsCtrl.apiGetRestaurantById);
router.route("/cuisines").get(ReastaurantsCtrl.apiGetRestaurantCusisines);

router.route("/review")
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview);

export default router;