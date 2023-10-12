import { Router } from "express";
import {
  getCurrentlyAiringAnimes,
  getTopAnimes,
  getTrendingAnimes,
  getAnimeInfo,
  getEpisodeSouces,
  getRecentEpisodes,
} from "../controllers/animeController/index.js";

const router = Router();

// router.route("/search").get(AnimeController.search);
router.route("/getAnimeInfo/:animeId").get(getAnimeInfo);
router.route("/getEpisodeSources/:episodeId").get(getEpisodeSouces);

router.route("/getRecentEpisodes").get(getRecentEpisodes);
router.route("/getTrendingAnimes").get(getTrendingAnimes);
router.route("/getTopAnimes").get(getTopAnimes);
router.route("/getCurrentlyAiringAnimes").get(getCurrentlyAiringAnimes);

export default router;
