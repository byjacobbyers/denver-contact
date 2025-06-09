import { SimpleTextType } from "../objects/simple-text-type";
import { DefaultImageType } from "../objects/default-img-type";

export type GalleryBlockType = {
  active?: boolean;
  componentIndex?: number;
  anchor?: string;
  images?: DefaultImageType[]; 
  fullScreen?: boolean; 
  content?: SimpleTextType;
};