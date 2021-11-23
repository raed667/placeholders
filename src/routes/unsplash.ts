import request from "request";
import express, { Request, Response } from "express";
import slugify from "slugify";

import { validateImageSize, validateOrientation } from "../service/validators";
import { getImage } from "../service/unsplash";

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

  Object.entries(meta).forEach(([key, value]) => {
    res.header(`x-${key}`, slugify(String(value)));
  });

  request.get(url).pipe(res);
});

export default router;
