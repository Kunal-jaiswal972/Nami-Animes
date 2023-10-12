import { DEFAULT_PAGE, MAX_PER_PAGE } from "../../constants/constants.js";
import { AnilistProvider } from "../../lib/consumet.js";
import { TopAnimeResponseSchema } from "../../validations/animeValidator.js";

export async function getTopAnimes(req, res) {
  try {
    const { page = DEFAULT_PAGE, perPage = MAX_PER_PAGE } = req.query;

    const currentPageNumber = Math.max(1, page);
    const limit = Math.min(MAX_PER_PAGE, perPage);

    const anilistResponse = await AnilistProvider.fetchPopularAnime(
      currentPageNumber,
      limit
    );
    const {
      success,
      data: validatedTopAnimeResponse,
      error,
    } = TopAnimeResponseSchema.safeParse(anilistResponse);

    if (!success) {
      console.error(error);
      throw new Error("Data is not valid!");
    }

    const { currentPage, hasNextPage, results } = validatedTopAnimeResponse;

    const paginationObj = {
      currentPage,
      hasNextPage,
      message: "currentPage > 0 and perPage <= 25.",
    };

    const topAnimesObj = results.map((anime) => {
      return {
        anilistId: anime.id,
        malId: anime.malId.toString(),
        image: anime.image,
        titles: {
          english: anime.title.english,
          default: anime.title.userPreferred,
          japanese: anime.title.native,
        },
        totalEpisodes: anime.totalEpisodes,
        duration: `${anime.duration} min`,
        format: anime.type,
        color: anime.color,
      };
    });

    const topAnimes = {
      data: topAnimesObj,
      pagination: paginationObj,
    };

    res.status(200).json(topAnimes);
  } catch (err) {
    console.error("[getTopAnimes]", err.message);
    res.status(500).json({ error: err.message });
  }
}
