import express from "express";
import MatchController from './match.controller';
import { IGetMatchesPayload } from "./match.repository";

const router = express.Router();

router.get("/", async (req, res) => {
  const controller = new MatchController();
  const { date, size, page }: IGetMatchesPayload  = req.query as any
  const response = await controller.getMatches(date, page, size);
  return res.send(response);
});

router.get("/availabilities", async (req, res) => {
  const controller = new MatchController();
  const { date }: { date: string }  = req.query as any
  const response = await controller.getAvailabilities(date);
  return res.send(response);
});

export default router;