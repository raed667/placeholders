import fetch from "cross-fetch";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { environment } from "../common/environment";

const HOST = "https://api.unsplash.com";

const { UNSPLASH_ACCESS_KEY } = environment();

const request = async (method: string, path: string): Promise<Basic[]> => {
  const res = await fetch(`${HOST}${path}`, {
    method,
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    },
  });
  return res.json();
};

export const getImages = (path: string) => request("GET", path);
