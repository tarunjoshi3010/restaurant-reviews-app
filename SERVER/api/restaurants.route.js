import express from "express";
import ReastaurantsCtrl from "../api/restaurants.controller.js";

const router = express.Router();

router.route("/").get(ReastaurantsCtrl.apiGetRestaurants);

export default router;