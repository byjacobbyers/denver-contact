import { defineType, defineField } from "sanity";
import { ImagesIcon } from "@sanity/icons";

const galleryBlock = defineType({
  title: "Gallery Block",
  name: "galleryBlock",
  type: "object",
  icon: ImagesIcon,
  fields: [
    defineField({
      title: "Active?",
      name: "active",
      type: "boolean",
      description: "Set to false if you need to remove from page but not delete",
      initialValue: true,
    }),
    defineField({
      title: "Anchor",
      name: "anchor",
      type: "string",
      description: "The anchor for the section. No hash symbols. Optional.",
    }),
    defineField({
      title: "Images",
      name: "images",
      type: "array",
      of: [{ type: "defaultImage" }],
      description: "Upload or select multiple images for the gallery.",
    }),
    defineField({
      title: "Full Screen",
      name: "fullScreen",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      title: "Content",
      name: "content",
      type: "simpleText",
      description: "Text content to display alongside or over the gallery.",
    }),
  ],
  preview: {
    select: {
      title: "content",
      active: "active",
      image: "images.0",
    },
    prepare({ title, active, image }) {
      return {
        title: "Gallery Block",
        subtitle: `${active ? "Active" : "Not Active"} - ${
          title ? title[0]?.children[0]?.text || "No Content" : "No Content"
        }`,
        media: image,
      };
    },
  },
});

export default galleryBlock;