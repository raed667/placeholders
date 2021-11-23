import { VeryBasic } from "unsplash-js/dist/methods/photos/types";

type ImageSize = keyof VeryBasic["urls"];

export const validateImageSize = (size: any): ImageSize => {
  const result = ["full", "raw", "regular", "small", "thumb"].includes(size)
    ? size
    : "thumb";

  return result as ImageSize;
};
