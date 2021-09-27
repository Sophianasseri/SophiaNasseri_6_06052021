/* eslint-disable import/extensions */
import { ImageMedia } from './image-class.js';
import { LightboxImage } from './lightbox.js';
import { LightboxVideo } from './lightoboc2.js';
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
export const factoryLightbox = (media) => {
  if (media.image) {
    return new 
    LightboxImage(e.currentTarget.getAttribute('href'));
  } if (media.video) {
    return new LightboxVideo(e.currentTarget.getAttribute('href'));
  }
  return undefined;
};

