import request from "request";
import express, { Request, Response } from "express";

import { validateImageSize, validateOrientation } from "../service/validators";
import { getImage } from "../service/unsplash";
import { environment } from "../common/environment";

const { CACHE_TTL } = environment();

const router = express.Router();

router.get("/image/:search?", async (req: Request, res: Response) => {
  const { search } = req.params;
  const { size, orientation } = req.query;

  const { url, meta } = await getImage(
    search,
    validateImageSize(size),
    validateOrientation(orientation)
  );

  res.set("Content-Type", "image/jpeg");
  res.header("cache-control", `public, max-age=${CACHE_TTL}`);

  Object.entries(meta).forEach(([key, value]) => {
    res.header(`x-${key}`, String(value));
  });

  request.get(url).pipe(res);
});

export default router;