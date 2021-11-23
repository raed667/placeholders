import { getImages } from "../domain/unsplash";
import qs from "qs";
import { environment } from "../common/environment";
import { getCacheKey, setCache, getCache } from "./cache";
import { validateImageSize } from "./validators";
import { Request } from "express";

const DEFAULT_SEARCH = "puppy";

const { PAGE_SIZE } = environment();

export const getImage = async (
  query = DEFAULT_SEARCH,
  params: Request["query"]
) => {
  const queryParams = `/photos/random?${qs.stringify({
    count: PAGE_SIZE,
    query,
    ...params,
  })}`;

  // Fin in cache
  const cached = await getCache(getCacheKey(queryParams));
  if (cached) {
    const randomIndex = Math.floor(Math.random() * cached.length);
    return cached[randomIndex];
  }

  const results = await getImages(queryParams);

  if (!results || !Array.isArray(results) || results.length === 0) {
    throw new Error("No images found");
  }

  const images = results.map((res) => {
    const { width, height, urls, color, alt_description, user } = res;
    const url = urls[validateImageSize(params.size)];
    return {
      url,
      meta: {
        width,
        height,
        color,
        alt_description,
        author_name: user.name,
        author_url: user.portfolio_url,
      },
    };
  });

  setCache(getCacheKey(query), images);

  const randomIndex = Math.floor(Math.random() * results.length);
  return images[randomIndex];
};
