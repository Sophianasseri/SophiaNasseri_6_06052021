import { ImageMedia } from "./image-class.js";
import { VideoMedia } from "./video-class.js";

export const fetchPhotographer = async () => {
  let response = await fetch("./js/data.json");
  let data = await response.json();
  return data.photographers;
};

export const fetchMedia = async () => {
  let response = await fetch("./js/data.json");
  let data = await response.json();
  return data.media;
};

export const factory = (media) => {
  if (media.image) {
    return new ImageMedia(media);
  } else if (media.video) {
    return new VideoMedia(media);
  }
  return undefined;
};
