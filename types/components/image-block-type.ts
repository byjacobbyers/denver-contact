import { SimpleTextType } from "../objects/simple-text-type";
import { DefaultImageType } from "../objects/default-img-type";
import { CtaType } from "../objects/cta-type";

export type ImageBlockType = {
  active?: boolean;
  componentIndex?: number;
  anchor?: string;
  image?: DefaultImageType; 
  fullScreen?: boolean; 
  halfHeight?: boolean;
  content?: SimpleTextType; 
  cta?: CtaType;
};