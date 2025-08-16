import { defineType, defineField } from "sanity";
import { ImageIcon } from "@sanity/icons";

const heroMural = defineType({
  title: "Hero Mural",
  name: "heroMural",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      title: "Active?",
      name: "active",
      type: "boolean",
      description:
        "Set to false if you need to remove from page but not delete.",
      initialValue: true,
    }),
    defineField({
      title: "Anchor",
      name: "anchor",
      type: "string",
      description: "The anchor for the section. No hash symbols. Optional.",
    }),
    defineField({
      title: "Background Image",
      name: "image",
      type: "defaultImage",
    }),
    defineField({
      title: "Behind Text",
      name: "behindText",
      type: "string",
      description: 'This text appears behind the group (e.g. "Denver").',
    }),
    defineField({
      title: "Front Image",
      name: "frontImage",
      type: "defaultImage",
    }),
    defineField({
      title: "Front Text",
      name: "frontText",
      type: "string",
      description: 'This text appears in front of the group (e.g. "Contact Improv").',
    }),
  ],
  preview: {
    select: {
      title: "behindText",
      subtitle: "frontText",
      media: "image.image", // assumes defaultImage has { image, alt }
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Mural Hero",
        subtitle: subtitle ? `→ ${subtitle}` : "",
        media,
      };
    },
  },
});

export default heroMural;