import { AnilistProvider } from "../../lib/consumet.js";

export async function getEpisodeSouces(req, res) {
  try {
    const { episodeId } = req.params;
    const episodeSources = await AnilistProvider.fetchEpisodeSources(episodeId);

    res.status(200).json(episodeSources);
  } catch (err) {
    console.error("[getEpisodeSources]", err.message);
    res.status(500).json({ error: err.message });
  }
}
