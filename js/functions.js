/* eslint-disable import/extensions */
import { ImageMedia } from './image-class.js';
import { VideoMedia } from './video-class.js';

export const fetchPhotographer = async () => {
  const response = await fetch('./js/data.json');
  const data = await response.json();
  return data.photographers;
};

export const fetchMedia = async () => {
  const response = await fetch('./js/data.json');
  const data = await response.json();
  return data.media;
};

export const factory = (media) => {
  if (media.image) {
    return new ImageMedia(media);
  } if (media.video) {
    return new VideoMedia(media);
  }
  return undefined;
};

export const getMediasFromPhotographer = async (id) => {
  const medias = await fetchMedia();
  return medias.filter((element) => element.photographerId === parseInt(id, 10));
};
