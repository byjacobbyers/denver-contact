import { defineType, defineField } from "sanity";
import { BlockElementIcon } from "@sanity/icons";

const spacerBlock = defineType({
  title: "Spacer Block",
  name: "spacerBlock",
  type: "object",
  icon: BlockElementIcon,
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
      title: "Size",
      name: "size",
      type: "string",
      initialValue: "medium",
      options: {
        list: [
          { title: "Small", value: "small" },
          { title: "Medium", value: "medium" },
          { title: "Large", value: "large" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      size: "size",
      active: "active",
    },
    prepare({ size, active }) {
      return {
        title: "Spacer Block",
        subtitle: `${active ? "Active" : "Not Active"} - Size: ${size || "Medium"}`,
      };
    },
  },
});

export default spacerBlock;