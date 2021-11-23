import { createApi, Orientation } from "unsplash-js";
import { VeryBasic } from "unsplash-js/dist/methods/photos/types";
import fetch from "cross-fetch";

import { environment } from "../common/environment";
import logger from "../common/logger";
import { getCacheKey, getCache, setCache } from "./cache";

const DEFAULT_SEARCH = "puppy";

const { UNSPLASH_ACCESS_KEY, PAGE_SIZE } = environment();

const unsplash = createApi({
  accessKey: UNSPLASH_ACCESS_KEY,
  fetch,
});

const searchUnsplash = async (query: string, orientation: Orientation) => {
  const result = await unsplash.photos.getRandom({
    count: PAGE_SIZE,
    query,
    orientation,
  });

  if (result.type !== "success") {
    logger.error(`Unsplash search failed: ${result.status}`, {
      result,
    });
    throw new Error(JSON.stringify(result.errors));
  }

  return result.response;
};

export const getImage = async (
  query = DEFAULT_SEARCH,
  size: keyof VeryBasic["urls"],
  orientation: Orientation
) => {
  const cached = await getCache(getCacheKey(query, size, orientation));
  if (cached) {
    const randomIndex = Math.floor(Math.random() * cached.length);
    return cached[randomIndex];
  }

  const results = await searchUnsplash(query, orientation);

  if (!results || !Array.isArray(results) || results.length === 0) {
    throw new Error("No images found");
  }

  const images = results.map((res) => {
    const { width, height, urls, color, alt_description, user } = res;
    const url = urls[size];
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

  setCache(getCacheKey(query, size, orientation), images);

  const randomIndex = Math.floor(Math.random() * results.length);
  return images[randomIndex];
};
