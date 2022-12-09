import express from "express";
import MatchRouter from "./match/match.router";

const router = express.Router();

router.use("/matches", MatchRouter)

export default router;