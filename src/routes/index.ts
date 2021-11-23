import express from "express";
import unsplash from "./unsplash";

const router = express.Router();

router.use("/", unsplash);

export default router;
