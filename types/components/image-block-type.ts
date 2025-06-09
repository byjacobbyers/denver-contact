import { SimpleTextType } from "../objects/simple-text-type";
import { DefaultImageType } from "../objects/default-img-type";

export type ImageBlockType = {
  active?: boolean;
  componentIndex?: number;
  anchor?: string;
  image?: DefaultImageType; 
  fullScreen?: boolean; 
  content?: SimpleTextType; 
};