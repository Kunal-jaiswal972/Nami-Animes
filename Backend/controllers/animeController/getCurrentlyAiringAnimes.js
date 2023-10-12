import { jikanApi } from "../../lib/axiosInstance.js";
import { DEFAULT_PAGE, MAX_PER_PAGE } from "../../constants/constants.js";

export async function getCurrentlyAiringAnimes(req, res) {
  try {
    const { page = DEFAULT_PAGE, perPage = MAX_PER_PAGE } = req.query;

    const currentPage = Math.max(1, page);
    const limit = Math.min(MAX_PER_PAGE, perPage);

    const { data: jikanResponse } = await jikanApi.get(
      `/seasons/now?page=${currentPage}&limit=${limit}`
    );

    const { pagination, data } = jikanResponse;
    const paginationObj = {
      currentPage: pagination.current_page,
      hasNextPage: pagination.has_next_page ? true : false,
      message: "currentPage > 0 and perPage <= 25.",
    };

    const CurrentlyAiringAnimes = {
      data,
      pagination: paginationObj,
    };
    res.status(200).json(CurrentlyAiringAnimes);
  } catch (err) {
    console.error("[getCurrentlyAiringAnimes]", err.message);
    res.status(500).json({ error: err.message });
  }
}
