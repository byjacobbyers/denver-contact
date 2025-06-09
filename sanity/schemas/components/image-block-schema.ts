import { defineType, defineField } from "sanity";
import { ImageIcon } from "@sanity/icons";

const imageBlock = defineType({
  title: "Image Block",
  name: "imageBlock",
  type: "object",
  icon: ImageIcon,
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
      title: "Image",
      name: "image",
      type: "defaultImage",
      description: "Upload or select an image.",
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
      description: "Text content to display alongside or over the image.",
    }),
  ],
  preview: {
    select: {
      title: "content",
      active: "active",
    },
    prepare({ title, active }) {
      return {
        title: "Image Block",
        subtitle: `${active ? "Active" : "Not Active"} - ${
          title ? title[0]?.children[0]?.text || "No Content" : "No Content"
        }`,
      };
    },
  },
});

export default imageBlock;