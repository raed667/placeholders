import slugify from "slugify";
import { join } from "path";
import { readFile, writeFile, access, mkdir } from "fs/promises";

export const getCacheKey = (query: string, size: string, orientation: string) =>
  slugify(
    `${query}_${size}_${orientation}`
      .replace(/^\//, "")
      .replace(/\//g, "_")
      .replace(/\?/g, "--")
      .replace(/&/g, "--")
      .replace(/=/g, "-")
  );

const getCacheDir = () => {
  const CACHE_DIR = "tmp";
  return join(process.cwd(), CACHE_DIR);
};

const getFile = (key: string) => {
  const cache_dir = getCacheDir();
  const file_name = `${key}.json`;
  return join(cache_dir, file_name);
};

export const setCache = async (key: string, data: any) => {
  const file = getFile(key);
  const body = JSON.stringify(data, null, 2);
  // Ensure cache dir exists
  const cache_dir = getCacheDir();
  try {
    await access(cache_dir);
  } catch (e) {
    await mkdir(cache_dir);
  }
  await writeFile(file, body);
};

export const getCache = async (key: string) => {
  const file = getFile(key);
  try {
    const body = await readFile(file);
    return JSON.parse(body.toString());
  } catch (e) {
    return null;
  }
};
