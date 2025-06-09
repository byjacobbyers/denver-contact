import { SimpleTextType } from "../objects/simple-text-type";

export type FaqBlockType = {
  active?: boolean;
  componentIndex?: number;
  anchor?: string;
  faqs?: {
    question: string;
    answer: SimpleTextType;
  }[];
};