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

export interface ImageResolution {
  url: string;
  size: number;
  width: number;
  height: number;
}

export interface ImageObject {
  id: string;
  rank: number;
  isActive: boolean;
  resolutions: {
    micro: ImageResolution;
    mobile: ImageResolution;
    desktop: ImageResolution;
    thumbnail: ImageResolution;
  };
}

export interface Images {
  [k: string]: ImageObject;
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
  images?: Images;
  type?: string;

  [k: string]: string | string[] | Images | undefined;
}
