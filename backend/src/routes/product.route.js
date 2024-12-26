import Router from "express";
import { getProduct } from "../controllers/prouct.controller.js";

const router = Router();


router.route("/getProduct").get(getProduct);

export default router;