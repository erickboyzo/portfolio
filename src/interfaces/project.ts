export interface Image {
  url: string;
  size: number;
  width: number;
  height: number;
}

export interface ImageResolution {
  resolutions: {
    micro: Image;
    thumbnail: Image;
    mobile: Image;
    desktop: Image;
  };
}

export interface Project {
  name?: string;
  description?: string;
  highlights?: string[];
  keywords?: string[];
  startDate?: string;
  endDate?: string;
  url?: string;
  roles?: string[];
  entity?: string;
  images: ImageResolution[];
  type?: string;

  [k: string]: any;
}
