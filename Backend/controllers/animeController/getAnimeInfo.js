import {
  ZoroProvider,
  AnilistProvider,
} from "../../lib/consumet.js";
import { jikanApi } from "../../lib/axiosInstance.js";

export async function getAnimeInfo(req, res) {
  try {
    const info = await AnilistProvider.fetchAnimeInfo("21");
    const i = await jikanApi.get(`/anime/21`);
    const z = await ZoroProvider.fetchAnimeInfo("overlord-iv-18075");

    res.status(200).json({ anilist: info, jikan: i.data, zoro: z });
  } catch (err) {
    console.error("[getAnimeInfo]", err.message);
    res.status(500).json({ error: err.message });
  }
}