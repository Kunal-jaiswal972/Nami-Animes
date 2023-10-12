import { ZoroProvider } from "../../lib/consumet.js";

export async function getRecentEpisodes(req, res) {
  try {
    const recentEpisodes = await ZoroProvider.fetchRecentEpisodes();

    res.status(200).json(recentEpisodes);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}
