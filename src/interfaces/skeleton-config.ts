interface SkeletonItem {
  skeletonType: string;
  class?: string;
  width?: number;
  height?: number;
}

interface SkeletonColumn {
  id: string;
  cols?: number;
  md?: number;
  sm?: number;
  items: SkeletonItem[];
}

interface SkeletonSection {
  type: 'content' | 'header' | 'grid';
  class?: string;
  skeletonType?: string;
  width?: number;
  height?: number;
  elevation?: number;
  items?: number;
  cols?: number;
  md?: number;
  sm?: number;
  itemClass?: string;
  itemHeight?: number;
  columns?: SkeletonColumn[];
}

export interface SkeletonConfig {
  sections: SkeletonSection[];
}

export interface SkeletonConfigs {
  about: SkeletonConfig;
  projects: SkeletonConfig;
  contact: SkeletonConfig;
  [key: string]: SkeletonConfig;
}
